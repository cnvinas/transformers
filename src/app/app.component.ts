import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Transformers Battle';
  teamDecepticons = [];
  teamAutobots = [];
  autobots = [
    {
      name: "AirRaid",
      allegiance: "A",
      strength: 5,
      intelligence: 7,
      speed: 9,
      endurance: 7,
      rank: 5,
      courage: 10,
      firepower: 8,
      skill: 7,
      result: ""
    },
    {
      name: "Brainstorm",
      allegiance: "A",
      strength: 5,
      intelligence: 8,
      speed: 9,
      endurance: 6,
      rank: 7,
      courage: 9,
      firepower: 7,
      skill: 8,
      result: ""
    },
    {
      name: "Grotusque",
      allegiance: "A",
      strength: 7,
      intelligence: 10,
      speed: 4,
      endurance: 6,
      rank: 8,
      courage: 10,
      firepower: 7,
      skill: 10,
      result: ""
    },
    {
      name: "Optimus Prime",
      allegiance: "A",
      strength: 10,
      intelligence: 10,
      speed: 8,
      endurance: 10,
      rank: 10,
      courage: 10,
      firepower: 8,
      skill: 10,
      result: ""
    }
  ];

  decepticons = [
    {
      name: "Astrotrain",
      allegiance: "D",
      strength: 9,
      intelligence: 7,
      speed: 10,
      endurance: 7,
      rank: 6,
      courage: 7,
      firepower: 6,
      skill: 8,
      result: ""
    },
    {
      name: "Dead End",
      allegiance: "D",
      strength: 7,
      intelligence: 6,
      speed: 7,
      endurance: 7,
      rank: 5,
      courage: 9,
      firepower: 5,
      skill: 7,
      result: ""
    },
    {
      name: "Flywheels",
      allegiance: "D",
      strength: 7,
      intelligence: 4,
      speed: 7,
      endurance: 7,
      rank: 6,
      courage: 8,
      firepower: 8,
      skill: 6,
      result: ""
    },
    {
      name: "Predaking",
      allegiance: "D",
      strength: 10,
      intelligence: 5,
      speed: null, //no data provided in ntfa.net
      endurance: 8,
      rank: 7,
      courage: 9,
      firepower: 9,
      skill: 8,
      result: ""
    }
  ];

  finalResult = { battles: 0, winningTeam: "", winners: [], survivorTeam: "", survivors: []};

  overAllRatings = (transformer) => {
    return (transformer.strength + transformer.intelligence + transformer.speed + transformer.endurance + transformer.firepower)
  }

  displayGroupInfo = (arr: []) => {
    let team = arr;
    let numberOfBattles, winningTeam, survivors;
    return { numberOfBattles, winningTeam, survivors }
  }

  sortByRank = (team) => {
    let sortTeam = team.length > 0 ? team : [];

    if (sortTeam.length > 0) {
      sortTeam.sort((prev, next) => {
        return prev.rank - next.rank;
      })

      return sortTeam;
    }
  }

  startBattle = () => {
    this.teamAutobots = this.setPlayers(this.sortByRank(this.autobots));
    this.teamDecepticons = this.setPlayers(this.sortByRank(this.decepticons));
    this.startFighting(this.teamAutobots, this.teamDecepticons);
    this.battleResults(this.teamAutobots, this.teamDecepticons);
  }

  startFighting = (ab, dc) => {
    this.setEqualNumberOfTeamPlayers(ab, dc);
    this.predakingOrOptimus(ab, dc);
    this.checkFigthersCourageStrengthAndSkill(ab, dc);
  }

  checkFigthersCourageStrengthAndSkill = (ab, dc) => {
    this.checkAutobotTeam(ab, dc);
    this.checkDecepticonTeam(ab, dc);
  }

  checkAutobotTeam = (ab, dc) => {
    ab.forEach((elem, index) => {
      let abOverAll = this.overAllRatings(elem);
      let dcOverAll = this.overAllRatings(dc[index]);

      if ((elem.courage - dc[index].courage >= 4)
        && (elem.strength - dc[index].strength >= 3)) {
        dc[index]["result"] = "Loser";
        elem["result"] = "Winner";
      } else if ((elem.skill - dc[index].skill >= 3)
        || (abOverAll > dcOverAll)) {
        dc[index]["result"] = "Loser";
        elem["result"] = "Winner";
      } else if (abOverAll === dcOverAll) {
        ab[index]["result"] = "Draw";
        elem["result"] = "Draw";
      } else if(elem.result === ""){
        ab[index]["result"] = "Draw";
        elem["result"] = "Draw";
      }
    });
  }

  checkDecepticonTeam = (ab, dc) => {
    dc.forEach((elem, index) => {
      let abOverAll = this.overAllRatings(ab[index]);
      let dcOverAll = this.overAllRatings(elem);

      if ((elem.courage - ab[index].courage >= 4)
        && (elem.strength - ab[index].strength >= 3)) {
        ab[index]["result"] = "Loser";
        elem["result"] = "Winner";
      } else if ((elem.skill - ab[index].skill >= 3)
        || (abOverAll < dcOverAll)) {
        ab[index]["result"] = "Loser";
        elem["result"] = "Winner";
      } else if (abOverAll === dcOverAll) {
        ab[index]["result"] = "Draw";
        elem["result"] = "Draw";
      } else if(elem.result === ""){
        ab[index]["result"] = "Draw";
        elem["result"] = "Draw";
      }
    });
  }

  setPlayers = (team) => {
    let counter = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    let tempTeam = [];
    team.forEach((item, index) => {
      if (index < counter) {
        tempTeam.push(item);
      }
    });
    return tempTeam;
  }

  setEqualNumberOfTeamPlayers = (ab, dc) => {
    return (ab.length < dc.length ? dc.length = ab.length : ab.length = dc.length);
  }

  predakingOrOptimus = (ab, dc) => {
    ab.forEach((elem, index) => {
      if (elem.name === "Optimus Prime" && dc[index].name !== "Predaking") {
        dc[index]["result"] = "Loser";
        elem["result"] = "Winner";
      } else if (elem.name === "Optimus Prime" && dc[index].name === "Predaking") {
        dc[index]["result"] = "Draw";
        elem["result"] = "Draw";
      }
    });

    dc.forEach((elem, index) => {
      if (elem.name === "Predaking" && ab[index].name !== "Optimus Prime") {
        ab[index]["result"] = "Loser";
        elem["result"] = "Winner";
      } else if (elem.name === "Predaking" && ab[index].name === "Optimus Prime") {
        ab[index]["result"] = "Draw";
        elem["result"] = "Draw";
      }
    });
  }

  battleResults = (ab, dc) => {
    this.finalResult = { battles: ab.length, winningTeam: "", winners: [], survivorTeam: "", survivors: [] };
    let abWinners = this.checkWinner(ab);
    let dcWinners = this.checkWinner(dc);

    if (abWinners > dcWinners) {
      this.setWinnerResults(ab, this.finalResult);
      this.setLosersResults(dc, this.finalResult);
    } else {
      this.setWinnerResults(dc, this.finalResult);
      this.setLosersResults(ab, this.finalResult);
    }
  }

  setWinnerResults = (team, finalResult) => {
    team.forEach(element => {
      if (element.result === "Winner") {
        finalResult.winners.push(element.name);
      }
    });

    finalResult.winningTeam = team[0].allegiance;
  }

  setLosersResults = (team, finalResult) => {
    team.forEach(element => {
      if (element.result === "Loser" || element.result === "Draw" ) {
        finalResult.survivors.push(element.name);
      }
    });

    finalResult.survivorTeam = team[0].allegiance;
  }

  checkWinner(team) {
    let winners = 0
    team.forEach(element => {
      element.result === "Winner" ? winners++ : winners;
    });

    return winners;
  }

  ngOnInit() {
    this.startBattle();
  }
}
