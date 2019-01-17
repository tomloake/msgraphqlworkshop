const { graphql, buildSchema } = require("graphql");
const axios = require("axios");
const schema = buildSchema(`
    type Team {
        id: ID!
        name: String
        points: Int
    }
    type Query {
        teams: [Team]
    }
`);

const resolver = {
    teams: () => {
        return axios
            .get("https://graphqlvoting.azurewebsites.net/api/score")
            .then(res => res.data);
    }
};

module.exports = async function (context, req) {

    const response = await graphql(schema, req.body.query, resolver)

    context.res ={
        body: response
    }
};