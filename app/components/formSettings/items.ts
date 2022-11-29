interface Option{ 
    value: number, 
    label : string
}

export const RateOptions : Array<Option> = [
    { label : "lento" , value: 0.3},
    { label : "Médio" , value: 0.6},
    { label : "Normal" , value: 1},
]

export const PitchOptions : Array<Option> = [
    { label : "grave" , value: 0.3},
    { label : "Médio" , value: 0.6},
    { label : "Normal" , value: 1},
]
