import React from 'react';
import DateRainInfo from './DateRainInfo.js';

export default class RainShower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        const days = 3; // TODO: dynamic, max of 3 days
        const key = process.env.REACT_APP_WEATHER_API_KEY;
        const query = 49103; // TODO: dynamic
        fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=${days}&key=${key}`)
          .then(res => res.json())
          .then(
            (result) => {
                // determine if it will rain in the next 3 days
                var outputDayInfo = [];
                var today = new Date();
                today.setHours(0, 0, 0, 0); // remove time part of the date
                result.forecast.forecastday.forEach(element => {
                    // execute something
                    var dateParts = element.date.split('-'); // 2020-01-04
                    var dateBeingLookedAt = new Date(dateParts[0], dateParts[1] - 1 /* for month index */, dateParts[2]);
                    dateBeingLookedAt.setHours(0, 0, 0, 0); // remove time part of the date
                    var dayOffset = Math.abs((dateBeingLookedAt.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    if (outputDayInfo[dayOffset]) {
                        outputDayInfo[dayOffset].willRain |= element.day.daily_will_it_rain;
                        outputDayInfo[dayOffset].willSnow |= element.day.daily_will_it_snow;
                    } else {
                        outputDayInfo[dayOffset] = {
                            date: dateBeingLookedAt,
                            offset: dayOffset,
                            willRain: element.day.daily_will_it_rain,
                            willSnow: element.day.daily_will_it_snow
                        };
                    }
                });

                this.setState({
                    isLoading: false,
                    apiResult: result,
                    place: {
                        name: result.location.name,
                        region: result.location.region,
                        country: result.location.country,
                        time: result.location.localtime
                    },
                    currentConditions: {
                        temperature: result.location.temp_f,
                        condition: result.current.condition
                    },
                    data: outputDayInfo
                });
            },
            (error) => {
                this.setState({
                    isLoading: false,
                    error: error
                });
            }
          )
      }

    render() {
        if (this.state.isLoading) {
            return <h1>Loading...</h1>;
        }
        if (this.state.error !== null) {
            return (
                <>
                    <h1>Error!</h1>
                    <p>{this.state.error}</p>
                </>
            );
        }
        const listItems = this.state.data.map((rainData) => 
            <DateRainInfo 
                key={rainData.offset} 
                date={rainData.date} 
                rains={rainData.willRain} 
                snows={rainData.willSnow}/>
        );
        return (
            <div>
                <h1>Welcome to {this.state.place.name}, {this.state.place.region}!</h1>
                <ul>{listItems}</ul>
            </div>
        );
    }
}
