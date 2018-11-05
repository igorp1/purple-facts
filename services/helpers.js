
export const generateID = (length=24) => {
    let txt = new Array(length)
    const chars = 'abcdef0123456789'
    txt = [...txt].map( x => chars.charAt(Math.floor(Math.random() * chars.length)) )
    return txt.join('')
}

export const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email); 
} 

export const isPhoneNumber = (number) => {
    const re = /^\D?(\d{3})\D*\D*(\d{3})\D*(\d{4})$/
    return re.test(number); 
}

export const isUrl = (s) => {
    const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    return re.test(s)
}
