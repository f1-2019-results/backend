const testRaceData = () => ({
    startTime: new Date(),
    trackId: '0',
    game: 'F1 2019',
    results: [
        {
            driverName: 'Max Verstappen',
            teamId: 2,
            isAi: true,
            startPosition: 2,
            position: 1,
            points: 25,
            laps: [
                {
                    sectors: [20, 30, 35],
                    position: 1,
                    invalid: false,
                },
                {
                    sectors: [20, 30.2, 35.1],
                    position: 1,
                    invalid: false,
                }
            ]
        },
        {
            driverName: 'Lewis Hamilton',
            teamId: 1,
            isAi: true,
            startPosition: 1,
            position: 2,
            points: 18,
            laps: [
                {
                    sectors: [20, 30, 35],
                    position: 2,
                    invalid: false,
                },
                {
                    sectors: [20, 30.3, 35.2],
                    position: 2,
                    invalid: false,
                }
            ]
        }
    ]
});

export default testRaceData;
