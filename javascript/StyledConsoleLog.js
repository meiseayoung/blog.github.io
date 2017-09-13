const label = ([raw]) => {
    const [color, label, ...message] = raw.split(' ')
    return [
        `%c${label}%c ${message.join(' ')}`,
        `color: white; background-color: ${color}; padding: 0 .5em 0 .5em`,
        ''
    ]
}

console.log(...label`red error this is my error message`)

console.log(...label`green success yay, it worked!`)
