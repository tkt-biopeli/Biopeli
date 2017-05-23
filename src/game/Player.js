// The class Player keeps track of players points

class Player {

    //initially player has 0 points
    constructor () {
        this.points = 0;
    }

    // adds points given as a parameter to players existing points
    addPoints(points) {
        this.points += points;
    }
    
}
