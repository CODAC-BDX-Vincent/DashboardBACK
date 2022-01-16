import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
// import { Widget } from '../widgets/schemas/widget.schema';
// import { AxiosResponse, Axios } from 'axios';
// import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  token =
    'ya29.a0ARrdaM-FHQHzan3PTJEigBEMBV3AChq1Xi_ZMvruUXVhOuul2YO-AMAznQwy-62MUAHxDsCY2NGqvCQJmUtAASLtMwxxkBsE4b2gMC6B0svwdX0mwEoYTwBYUQrkZ9PAxYI6jgGgcqNRj5R_sbYqLITXAFW6-5YNwg';
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (bcrypt.compareSync(password, user.password)) {
      return {
        user,
        // findAll(): Promise<AxiosResponse<Widget[]>> {
        //   return this.httpService.get(
        //     this.user.widgetlist.service.request + this.user.widgetlist.request,
        //   );
        // },
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    const response = await this.httpService
      .get('https://v2.jokeapi.dev/joke/Any?lang=fr')
      .toPromise();
    const arrIdCities = [];
    const arrWeathers = [];

    const tabCities = ['Bordeaux', 'Marseille', 'Lyon'];
    for (let i = 0; i < tabCities.length; i++) {
      const response2 = await this.httpService
        .get(
          'https://www.metaweather.com/api/location/search/?query=' +
            tabCities[i],
        )
        .toPromise();
      arrIdCities.push(response2.data[0].woeid);
    }

    for (let i = 0; i < arrIdCities.length; i++) {
      const response2 = await this.httpService
        .get('https://www.metaweather.com/api/location/' + arrIdCities[i] + '/')
        .toPromise();
      arrWeathers.push(response2.data);
    }

    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      Authorization: `Bearer ` + this.token,
    };
    const response4 = await this.httpService
      .get(
        'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&key=AIzaSyBjdvfJUX0UyfquZIekm3lz_SpTCMKYW2Y',
        { headers: headersRequest },
      )
      .toPromise();

    // const response3 = await this.httpService
    //   .get('https://www.metaweather.com/api/location/' + response2.data.woeid)
    //   .toPromise();
    const Joke = {
      blague: response.data.setup,
      chute: response.data.delivery,
    };

    return {
      // User: typeof user.user.widgetlist,
      access_token: this.jwtService.sign(payload),
      Joke: Joke,
      Weathers: arrWeathers,
      Youtube: response4.data,
    };
    // // Axios.get(user.widgetlist.service.request + user.widgetlist.request)
    // let data;
    // Axios.get('https://v2.jokeapi.dev/joke/Any?lang=fr').then(
    //   .then((res) => (data = res.data));
    // return data;
    // return {
    //   access_token: this.jwtService.sign(payload),
    //   // data: payload, //TODO without password
    //   // data: data,
    //   // findAll(): Promise<AxiosResponse<Widget[]>> {
    //   //   return this.httpService.get(
    //   //     this.user.widgetlist.service.request + this.user.widgetlist.request,
    //   //   );
    //   // },
    // };
  }
}
