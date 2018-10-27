/*
* Adding FourSquare location information
* Resource: Forrest Walker's Walkthrough: https://www.youtube.com/watch?v=Dj5hzKBxCBI&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=3
*/


class Helper {
  static baseURL() {
    // base API URL for Foursquare
    return "https://api.foursquare.com/v2";
  }
  static auth() {
    // auth credentials
    const keys = {
      client_id: "TALUJVAXB14U3KB0FQWWR45U3LHOHYAXBOOOCCYMYLQWUESN",
      client_secret: "XNQRJOX32Q1LR25S1XLDFM2DHKACOAN5RYVTB3HFNP3PAAGF",
      v: "20181027"
    };
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");
  }
  static urlBuilder(urlPrams) {
    if (!urlPrams) {
      return ""
    }
    return Object.keys(urlPrams)
      .map(key => `${key}=${urlPrams[key]}`)
      .join("&");
  }
  // Request headers
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  // Fetch Request
  static simpleFetch(endPoint, method, urlPrams) {
    let requestData = {
      method,
      headers: Helper.headers()
    };
    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
      urlPrams
    )}`,
      requestData
    ).then(res => res.json()).catch(() => alert('Sorry. Unable to find trails in the area.'))
  }
}

export default class SquareAPI {
  // Get venues
  static search(urlPrams) {
    return Helper.simpleFetch("/venues/search", "GET", urlPrams);
  }
  // Get details of that venue
  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET")
  }
  // Get images
  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}