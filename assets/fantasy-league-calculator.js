(function () {
  "use strict";

  const MAX_PLAYERS_PER_TEAM = 13;
  const categories = [
    { key: "PTS", label: "PTS", inverse: false },
    { key: "REB", label: "REB", inverse: false },
    { key: "AST", label: "AST", inverse: false },
    { key: "STL", label: "STL", inverse: false },
    { key: "BLK", label: "BLK", inverse: false },
    { key: "3PM", label: "3PM", inverse: false },
    { key: "FG%", label: "FG%", inverse: false, percentage: true },
    { key: "FT%", label: "FT%", inverse: false, percentage: true },
    { key: "TO", label: "TO", inverse: true }
  ];
  const countingKeys = ["PTS", "3PM", "REB", "AST", "STL", "BLK", "TO"];
  const page = {
    rosterInput: document.getElementById("roster-input"),
    calculateButton: document.getElementById("calculate-button"),
    exampleButton: document.getElementById("example-button"),
    clearButton: document.getElementById("clear-button"),
    status: document.getElementById("status-message"),
    resultsNotice: document.getElementById("results-notice"),
    results: document.getElementById("results-section"),
    teamFilter: document.getElementById("team-filter"),
    matchupHead: document.getElementById("matchup-head"),
    matchupBody: document.getElementById("matchup-body"),
    resultCount: document.getElementById("result-count"),
    noMatchups: document.getElementById("no-matchups"),
    teamTotalsBody: document.getElementById("team-totals-body")
  };
  let playerIndex = new Map();
  let currentMatchups = [];
  let currentTeams = [];

  function normalizeName(name) {
    return String(name || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\b(?:jr|sr|ii|iii|iv|v)\b/g, "")
      .replace(/[^a-z0-9]/g, "");
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;
    const source = text.replace(/^\uFEFF/, "");

    for (let i = 0; i < source.length; i += 1) {
      const character = source[i];
      if (quoted) {
        if (character === '"' && source[i + 1] === '"') {
          field += '"';
          i += 1;
        } else if (character === '"') {
          quoted = false;
        } else {
          field += character;
        }
      } else if (character === '"' && field.length === 0) {
        quoted = true;
      } else if (character === ",") {
        row.push(field);
        field = "";
      } else if (character === "\n") {
        row.push(field.replace(/\r$/, ""));
        rows.push(row);
        row = [];
        field = "";
      } else {
        field += character;
      }
    }

    if (field.length || row.length) {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
    }
    return rows;
  }

  function createPlayerIndex(csvText) {
    const rows = parseCsv(csvText);
    if (rows.length < 2) {
      throw new Error("The projected stats CSV is empty or malformed.");
    }
    const headers = rows[0].map(function (header) {
      return header.trim();
    });
    const index = new Map();

    rows.slice(1).forEach(function (values) {
      const player = {};
      headers.forEach(function (header, column) {
        player[header] = values[column] || "";
      });
      if (player.Player && normalizeName(player.Player)) {
        index.set(normalizeName(player.Player), player);
      }
    });
    return index;
  }

  function parseDelimitedLine(line, delimiter) {
    if (delimiter === "\t") {
      return line.split("\t");
    }
    const parsed = parseCsv(line);
    return parsed[0] || [];
  }

  function addRosterRow(groups, teamName, playerName) {
    const team = String(teamName || "").trim();
    const player = String(playerName || "")
      .trim()
      .replace(/^[•*\-]\s*/, "");
    if (!team || !player) {
      return;
    }
    if (!groups.has(team)) {
      groups.set(team, []);
    }
    groups.get(team).push(player);
  }

  function parseRoster(text) {
    const input = text.replace(/\r\n?/g, "\n").trim();
    if (!input) {
      throw new Error("Paste roster data before calculating matchups.");
    }

    const lines = input.split("\n");
    const firstNonEmpty = lines.find(function (line) {
      return line.trim();
    }) || "";
    const delimiter = firstNonEmpty.includes("\t") ? "\t" :
      (firstNonEmpty.includes(",") ? "," : "");
    const groups = new Map();

    if (delimiter) {
      const rows = lines.filter(function (line) {
        return line.trim();
      }).map(function (line) {
        return parseDelimitedLine(line, delimiter).map(function (value) {
          return value.trim();
        });
      });
      const firstRow = rows[0] || [];
      const normalizedHeaders = firstRow.map(function (header) {
        return header.toLowerCase().replace(/[^a-z]/g, "");
      });
      let teamColumn = normalizedHeaders.findIndex(function (header) {
        return ["fantasyteam", "team", "teamname", "owner", "ownername"].includes(header);
      });
      let playerColumn = normalizedHeaders.findIndex(function (header) {
        return ["player", "playername", "name"].includes(header);
      });
      const hasHeader = teamColumn >= 0 && playerColumn >= 0;

      if (!hasHeader) {
        teamColumn = 0;
        playerColumn = rows.some(function (row) {
          return row.length > 2;
        }) ? 2 : 1;
      }

      rows.slice(hasHeader ? 1 : 0).forEach(function (row) {
        addRosterRow(groups, row[teamColumn], row[playerColumn]);
      });
    } else {
      const blocks = input.split(/\n\s*\n/);
      blocks.forEach(function (block) {
        const blockLines = block.split("\n").map(function (line) {
          return line.trim();
        }).filter(Boolean);
        if (!blockLines.length) {
          return;
        }
        const inlineTeam = blockLines[0].match(/^([^:]+):\s*(.*)$/);
        if (inlineTeam) {
          inlineTeam[2].split(/[,;]+/).forEach(function (name) {
            addRosterRow(groups, inlineTeam[1], name);
          });
        } else if (blockLines.length > 1) {
          blockLines.slice(1).forEach(function (name) {
            addRosterRow(groups, blockLines[0], name.replace(/^(PG|SG|G|SF|PF|F|C|UTIL|BN|IL)\s*[:\-]\s*/i, ""));
          });
        }
      });
    }

    if (groups.size < 2) {
      throw new Error("Could not identify at least two teams. Paste a spreadsheet with team and player columns, or separate team-name/player blocks with a blank line.");
    }

    const owners = new Map();
    const duplicatePlayers = [];
    const overLimit = [];
    const unmatchedPlayers = [];
    const teams = [];

    groups.forEach(function (roster, name) {
      const team = { name: name, players: [], rosterNames: [], unmatched: [], stats: null };
      const inTeam = new Set();

      roster.forEach(function (playerName) {
        const key = normalizeName(playerName);
        if (!key || inTeam.has(key)) {
          return;
        }
        inTeam.add(key);
        if (team.rosterNames.length >= MAX_PLAYERS_PER_TEAM) {
          overLimit.push({ team: name, player: playerName });
          return;
        }

        team.rosterNames.push(playerName);
        if (owners.has(key)) {
          duplicatePlayers.push({
            player: playerName,
            firstTeam: owners.get(key),
            skippedTeam: name
          });
          return;
        }
        owners.set(key, name);

        const player = playerIndex.get(key);
        if (!player) {
          team.unmatched.push(playerName);
          unmatchedPlayers.push({ team: name, player: playerName });
          return;
        }
        team.players.push(player);
      });

      team.stats = aggregateTeam(team.players);
      teams.push(team);
    });

    return {
      teams: teams,
      duplicatePlayers: duplicatePlayers,
      overLimit: overLimit,
      unmatchedPlayers: unmatchedPlayers
    };
  }

  function numberValue(player, key) {
    const value = Number(player[key]);
    return Number.isFinite(value) ? value : 0;
  }

  function aggregateTeam(players) {
    const totals = {
      GP: 0,
      FGM: 0,
      FGA: 0,
      FTM: 0,
      FTA: 0,
      projections: 0,
      baselines: 0,
      missing: 0
    };
    countingKeys.forEach(function (key) {
      totals[key] = 0;
    });

    players.forEach(function (player) {
      const games = numberValue(player, "GP");
      totals.GP += games;
      totals.FGM += numberValue(player, "FGM") * games;
      totals.FGA += numberValue(player, "FGA") * games;
      totals.FTM += numberValue(player, "FTM") * games;
      totals.FTA += numberValue(player, "FTA") * games;
      countingKeys.forEach(function (key) {
        totals[key] += numberValue(player, key) * games;
      });
      if (player.ProjectionType === "2026-27 projection") {
        totals.projections += 1;
      } else {
        totals.baselines += 1;
      }
    });

    totals["FG%"] = totals.FGA > 0 ? totals.FGM / totals.FGA : null;
    totals["FT%"] = totals.FTA > 0 ? totals.FTM / totals.FTA : null;
    return totals;
  }

  function compareCategory(team1, team2, category) {
    const value1 = team1.stats[category.key];
    const value2 = team2.stats[category.key];
    let winner = "tie";

    if (value1 === null && value2 !== null) {
      winner = "team2";
    } else if (value2 === null && value1 !== null) {
      winner = "team1";
    } else if (value1 !== null && value2 !== null && Math.abs(value1 - value2) > 0.0000001) {
      const team1Better = category.inverse ? value1 < value2 : value1 > value2;
      winner = team1Better ? "team1" : "team2";
    }

    return {
      key: category.key,
      label: category.label,
      value1: value1,
      value2: value2,
      winner: winner,
      edge: value1 === null || value2 === null ? 0 :
        (category.inverse ? value2 - value1 : value1 - value2)
    };
  }

  function createMatchups(teams) {
    const matchups = [];
    for (let i = 0; i < teams.length; i += 1) {
      for (let j = i + 1; j < teams.length; j += 1) {
        const team1 = teams[i];
        const team2 = teams[j];
        const results = categories.map(function (category) {
          return compareCategory(team1, team2, category);
        });
        const wins1 = results.filter(function (result) {
          return result.winner === "team1";
        }).length;
        const wins2 = results.filter(function (result) {
          return result.winner === "team2";
        }).length;
        matchups.push({
          team1: team1,
          team2: team2,
          categories: results,
          wins1: wins1,
          wins2: wins2,
          ties: results.length - wins1 - wins2,
          overallWinner: wins1 === wins2 ? "tie" : (wins1 > wins2 ? "team1" : "team2"),
          overallEdge: wins1 - wins2
        });
      }
    }
    return matchups;
  }

  function formatNumber(value) {
    if (value === null || !Number.isFinite(value)) {
      return "—";
    }
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    });
  }

  function formatCategoryValue(value, percentage) {
    if (value === null || !Number.isFinite(value)) {
      return "—";
    }
    return percentage ? (value * 100).toFixed(1) + "%" : formatNumber(value);
  }

  function makeCell(text, className) {
    const cell = document.createElement("td");
    if (className) {
      cell.className = className;
    }
    cell.textContent = text;
    return cell;
  }

  function appendOption(select, value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  }

  function updateFilterOptions(teams) {
    const selectedTeam = teams.some(function (team) {
      return team.name === page.teamFilter.value;
    }) ? page.teamFilter.value : teams[0].name;
    page.teamFilter.replaceChildren();
    teams.forEach(function (team) {
      appendOption(page.teamFilter, team.name, team.name);
    });
    page.teamFilter.value = selectedTeam;
  }

  function matchupPassesFilters(matchup) {
    const teamFilter = page.teamFilter.value;
    return matchup.team1.name === teamFilter || matchup.team2.name === teamFilter;
  }

  function displayWinner(result, matchup) {
    const winnerCell = document.createElement("td");
    winnerCell.className = "category-cell";
    const winner = document.createElement("span");
    winner.className = "winner winner-" + result.winner;
    winner.textContent = result.winner === "team1" ? matchup.team1.name :
      (result.winner === "team2" ? matchup.team2.name : "Tie");
    const values = document.createElement("span");
    values.className = "category-values";
    const category = categories.find(function (item) {
      return item.key === result.key;
    });
    values.textContent = formatCategoryValue(result.value1, category.percentage) +
      " / " + formatCategoryValue(result.value2, category.percentage);
    winnerCell.append(winner, values);
    return winnerCell;
  }

  function displayOverallWinner(matchup) {
    const cell = document.createElement("td");
    cell.className = "category-cell overall-cell";
    const winner = document.createElement("span");
    winner.className = "winner winner-" + matchup.overallWinner;
    winner.textContent = matchup.overallWinner === "team1" ? matchup.team1.name :
      (matchup.overallWinner === "team2" ? matchup.team2.name : "Tie");
    const score = document.createElement("span");
    score.className = "category-values";
    score.textContent = matchup.wins1 + "–" + matchup.wins2 +
      (matchup.ties ? "–" + matchup.ties + " tied" : "") + " categories";
    cell.append(winner, score);
    return cell;
  }

  function renderMatchups() {
    const filtered = currentMatchups.filter(matchupPassesFilters);
    page.matchupBody.replaceChildren();
    page.resultCount.textContent = "Showing " + filtered.length + " of " + currentMatchups.length + " matchups";
    page.noMatchups.hidden = filtered.length > 0;

    filtered.forEach(function (matchup) {
      const row = document.createElement("tr");
      row.append(
        makeCell(matchup.team1.name),
        makeCell(matchup.team2.name)
      );
      matchup.categories.forEach(function (result) {
        row.appendChild(displayWinner(result, matchup));
      });
      row.appendChild(displayOverallWinner(matchup));
      page.matchupBody.appendChild(row);
    });
  }

  function renderTeamTotals(teams) {
    page.teamTotalsBody.replaceChildren();
    teams.forEach(function (team) {
      const row = document.createElement("tr");
      row.appendChild(makeCell(team.name, "team-name"));
      row.appendChild(makeCell(team.players.length + " / " + team.rosterNames.length, "numeric"));
      row.appendChild(makeCell(formatNumber(team.stats.GP), "numeric"));
      ["PTS", "3PM", "REB", "AST", "STL", "BLK"].forEach(function (key) {
        row.appendChild(makeCell(formatNumber(team.stats[key]), "numeric"));
      });
      row.appendChild(makeCell(formatCategoryValue(team.stats["FG%"], true), "numeric"));
      row.appendChild(makeCell(formatCategoryValue(team.stats["FT%"], true), "numeric"));
      row.appendChild(makeCell(formatNumber(team.stats.TO), "numeric"));
      page.teamTotalsBody.appendChild(row);
    });
  }

  function renderResults(parsed) {
    currentTeams = parsed.teams;
    currentMatchups = createMatchups(currentTeams);
    page.results.hidden = false;
    page.matchupHead.replaceChildren();
    page.teamFilter.value = "";

    const headRow = document.createElement("tr");
    ["Team 1", "Team 2"].forEach(function (label) {
      const th = document.createElement("th");
      th.textContent = label;
      headRow.appendChild(th);
    });
    categories.forEach(function (category) {
      const th = document.createElement("th");
      th.textContent = category.label + " Winner";
      headRow.appendChild(th);
    });
    const overallHeader = document.createElement("th");
    overallHeader.textContent = "Overall Matchup Winner";
    headRow.appendChild(overallHeader);
    page.matchupHead.appendChild(headRow);

    updateFilterOptions(currentTeams);
    renderMatchups();
    renderTeamTotals(currentTeams);

    const notices = [];
    if (parsed.duplicatePlayers.length) {
      notices.push(parsed.duplicatePlayers.length + " duplicate player claim(s) were skipped for the later team; the first team listed keeps that player.");
    }
    if (parsed.overLimit.length) {
      notices.push("Only the first " + MAX_PLAYERS_PER_TEAM + " distinct players per team were included; " + parsed.overLimit.length + " additional player row(s) were ignored.");
    }
    if (parsed.unmatchedPlayers.length) {
      notices.push(parsed.unmatchedPlayers.length + " player(s) had no row in the CSV and were excluded: " +
        parsed.unmatchedPlayers.map(function (item) {
          return item.player + " (" + item.team + ")";
        }).join(", ") + ".");
    }
    const baselines = currentTeams.reduce(function (total, team) {
      return total + team.stats.baselines;
    }, 0);
    const projectionCount = currentTeams.reduce(function (total, team) {
      return total + team.stats.projections;
    }, 0);
    const sourceSummary = projectionCount + " player(s) use 2026–27 projections; " +
      baselines + " use 2025–26 actual baselines.";
    notices.unshift(sourceSummary);
    page.status.className = "message";
    page.status.textContent = "";
    page.resultsNotice.className = "message visible " +
      (parsed.unmatchedPlayers.length || parsed.overLimit.length || parsed.duplicatePlayers.length ? "warning" : "success");
    page.resultsNotice.textContent = notices.join(" ");
  }

  function setMessage(text, type) {
    page.status.className = "message visible " + type;
    page.status.textContent = text;
  }

  function loadExample() {
    page.rosterInput.value = [
      "Fantasy Team\tSlot\tPlayer\tNBA Team",
      "Team Alpha\tPG\tShai Gilgeous-Alexander\tOKC",
      "Team Alpha\tC\tNikola Jokic\tDEN",
      "Team Alpha\tSG\tAnthony Edwards\tMIN",
      "Team Alpha\tF\tJayson Tatum\tBOS",
      "Team Beta\tPG\tLuka Doncic\tLAL",
      "Team Beta\tC\tVictor Wembanyama\tSA",
      "Team Beta\tSG\tTyrese Maxey\tPHI",
      "Team Beta\tF\tGiannis Antetokounmpo\tMIL"
    ].join("\n");
    calculate();
  }

  function calculate() {
    try {
      const parsed = parseRoster(page.rosterInput.value);
      renderResults(parsed);
    } catch (error) {
      page.results.hidden = true;
      setMessage(error.message, "error");
    }
  }

  function clear() {
    page.rosterInput.value = "";
    page.results.hidden = true;
    page.status.className = "message";
    page.status.textContent = "";
    page.resultsNotice.className = "message";
    page.resultsNotice.textContent = "";
    currentTeams = [];
    currentMatchups = [];
  }

  page.calculateButton.addEventListener("click", calculate);
  page.exampleButton.addEventListener("click", loadExample);
  page.clearButton.addEventListener("click", clear);
  page.teamFilter.addEventListener("change", renderMatchups);

  fetch("2026-2027_projected_stats.csv")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load player stats (HTTP " + response.status + ").");
      }
      return response.text();
    })
    .then(function (csvText) {
      playerIndex = createPlayerIndex(csvText);
      page.calculateButton.disabled = false;
      page.exampleButton.disabled = false;
      setMessage("Player stats loaded (" + playerIndex.size + " players). Paste your rosters or load the example.", "success");
    })
    .catch(function (error) {
      page.calculateButton.disabled = true;
      setMessage(error.message + " The CSV must be served from the website; opening this page directly as a local file will not load it.", "error");
    });
}());
