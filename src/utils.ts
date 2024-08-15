import _ from "lodash";

export const getColourOptions = (data: any) => {
const facets = data.facets

    const colourOptions = _.find(facets, { identifier: 'colour' })
    return colourOptions.options
}