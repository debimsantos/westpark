import axios from 'axios';


// Get venues from FourSquare
export const getVenues = (resp, err) => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
        client_id: "TALUJVAXB14U3KB0FQWWR45U3LHOHYAXBOOOCCYMYLQWUESN",
        client_secret: "XNQRJOX32Q1LR25S1XLDFM2DHKACOAN5RYVTB3HFNP3PAAGF",
        query: "trail",
        ll: "33.687533,-117.816489",
        radius: 8000,
        limit: 10,
        v: "20181019"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
        .then(res => {
            resp({ data: res.data.response.groups[0].items });
        })
        .catch(error => {
            //console.log("Error fetching venues from FourSquare:" + error)
            err({ error: error })
        })
}