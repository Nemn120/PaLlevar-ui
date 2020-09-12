// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
<<<<<<< HEAD
 // HOST: "https://hidden-wildwood-21108.herokuapp.com", // PRUEBAS - ANTIGUAS

  //HOST:  "http://localhost:8080",https://fathomless-spire-26742.herokuapp.com/ //LOCAL
  //HOST: "https://fathomless-spire-26742.herokuapp.com", // PRODUCCION
 HOST: "https://pallevar-backend-2020.herokuapp.com", // QA NUEVO 
=======
  //HOST: "https://hidden-wildwood-21108.herokuapp.com", // PRUEBAS - ANTIGUAS
  //HOST:  "http://localhost:8080",https://fathomless-spire-26742.herokuapp.com/ //LOCAL
  HOST: "https://pallevar-backend-2020.herokuapp.com", // QA NUEVO 
>>>>>>> 5aeb3c39d927aab05895ee7c6ddafb0c8e85ffa9

  PRECIO_ENTRADA: 'ENT',
  TOKEN_NAME : 'access_token',
  TOKEN_AUTH_USERNAME: 'pallevarR',
  TOKEN_AUTH_PASSWORD: 'pallevarx',
  REINTENTOS: 3,
  MICRO_CRUD: 'micro-crud',
  MICRO_CR : 'micro-cr',
  MICRO_AUTH : 'uaa',

  HOST_MAPBOX:'https://api.mapbox.com',
  TOKEN_MAPBOX:'pk.eyJ1Ijoia2F0cmllbCIsImEiOiJja2RjOXlrZTUxM3RsMnlxcmtwd3NrZWMwIn0.buu1mRI4DLdAUacSHR_2gw'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
