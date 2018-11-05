// dimension : 30x30 
// encoder : http://b64.io

const emojiPolyfillImages = {
    'tada' :        'data:image/png;base64,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',
    'smile' :       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAInUlEQVR42pVXCVSU1xV+iXEWUDE2iHti3KMxLqmNx2gTW1vbHq2nVrsksUpcwT2CRgFHEVERwV02QQQFZAuJCIJxQwFFBlEGXFhkZ9hh2Oaf//96542O05qm+M75zn/nvnu/79373jnvDft/IyqK9cBV9hbr5jDGgnJ+NoaxN//3JNgbUL0UVLEoWfP+fp90BrHVXZHMSx/LAvTxhEh2sPM0W9PuxaYnsiNycz7lGjnY64yoRS9XXLVumW3HSbZNjGVq8QYzoPivQIMLoDtE8CHbDSj+B6SbCoMQw+53HGc7ih0WDTAvgHN1Y1y1qFLnbbvUcI6V4sEMoImE9KkANCJQLgA1z1FByBchXAWajwN5vwflVLR4sRWW1XdTVPVWx2EWiBQGVH0LCJeIPEeA9FCEqJFg0ACGAg5ui3kSpAcijzGkCKhxB35kII5QFVPJzOI/214S7TzMEpDWH9DuI7JEPQkD+ouEZFBlhDQSTOcgm/tojvAD2RchSYkC6n0NSJ+AziMsiYv/VNstD0HbARaEK9ZApaseXcEiugKAriAiDSNEEKIJ8SSQwEE295nmzhpjCf7guTUeelwfgfYD7OwrWpZtaNw9eCmiGFBgL6KRqm11Bzr3EclBSJ0+hKNkn3hOHAjTovy4j+Z4DMWaclrcwTmeOhgQw9C0y2aVWcuyxdnLZtp2+rBS3P4UUvkG2qcNlLgZ0DlB6thGZDuI1I1sFdnuhD0cZHMfzfEYqX0rz+G5NeshVWwUkDkHnb6sSrNy6sAXLTevoM5VuQ1RSiBnviAVfQmUEWqXQmq0B9pXEOlKoGMVoF9L5OvIXs9BNvfRnCmmbQWkBnuei7KvIBV9AeT+RUBMf9S7sZ3/ddAWyZr3MjUujQLuzxVQ8CegaD6tdgFQvxD6yvlICZmE6ENj0Vgyn4S+gNT2Tw6yyTcP0T5jkRw0CV3lfwbqFkIyfovngXPd/4OA5Alo8WR5m4ZMV7IX4/EGu1+1evcQkDQOuDtDRO4s4NFnkEpmA9VzcOPMWDjLGVz6MZx3HwKxYS7Q+kcOsX4u97n0ZzzmevBYoOq3kIpncw7iMnFe/hCtvj2lR5tsZ5qFC51tVot+CiBxlIhbkyTcmwrpwS+Bwk/QnvcxTiyzwqm/WSF0xdvw/JyhKudjoPHXhFmozpnKfaHL+/KYk/bW6MjjuSaOexR7a7KEpNEiAqxR7NxnvVn4qXPvAwhSQPphqIBr4yRkTIB070Pg8WRob47DgYUKPLo2GRXqafD9lw3yjFtSO41DQ7bPkr6oyJ5GMZNwcLECtWnjeC7nIC5c+wDSxWECgpV4uq3XYbNwvnMvf0OgDIZ4OwGpoyFRoiGDkh+MR13aB7gbS3bZFKB6Ch6mjkchEaFiihHczrsywTjHYzKjx/IcyjVycC6kjoH43QC9GCTHI2erELPwwy29/DtPyaCPfUeQLo8GbhIRtRvZUyHmToZYQN+HEyFqJkIqnAIDQXr6EYdINvn4nJg3EYZ8sikHasq/N5lzSZfHQIi1FfT+MuRvsRBWb+zt1XpUho6IPnT6RkodlyZAG81gSLMD7hNB/nRq3afAE8JTQqERM56D+0x4PMMUSzmd196GNqYvhJSPgKQR6Iy0EdqOy3F/U5+Xrc5aa7O65oACzSHWIpKGSE8ChsJtySKcdfocySoG9UmGkgsMdckMzdcZdLcZ2jOMeBO6WyZfbRJDUQRD5hGGhO0Mfut/h11//w20EYNJeJjUcsZarD2oQNbavhvMwtfs+0/P364w1Pn1BhKGis8CGM6FBONmZjbi475HeFAIgg95IcjdGQE7liPAeTH8tyyA/zfz4e+02OTb7YQAr/0IDTiNuNgEpFxPR5i3K5oiGaT498R6f2vkuyhwfZXtLLOwavx4mXqzMqf2iBIdkcOENgqO8HREepYaJWXlqG1sQmNrG0ddUwu09Y2oqW1ANUFb34T65laaa0eDrh1VdQ0oLClGcuo1XPKcAymBoe38YKHuqBLqzVYav3lTrf7jgsh0tNle5iGH1s9GMMQNxB0vhp32XyL8hA8uxkQhKzMDRYWF0Gpr0NzcDJ1Oh1YdCTY2orKyEgUaDdKuXkHs2dMI9tmP3UsXoDiQQYwbxDkrPOXIcOy768W9b74kvls+3C57o7K83FuOptBBQhvtafimYQg8cQpx4cEI2L8Lp/a4wM/DBf57XTn83L/FCZUTjrltwVHXbyhGhbhzZ+DjsReX3RgM8QPRGGIrlB9SInuTsubKkiGDzReT5csjfU3v5UVucpT4WBl04e+K2jCGkF1fIynlOgqePIWmoAC5D3KRk6OGOjsbOWo1HtBvTX4BHhcWQfOkEJFR8YhRzUbbhT5oOTtEfOZrbShRUbUOvRxeeQyAvbyc7zgqQio9SNzXWq8LGyZqQ+igbRlOlZ/EzfS7yH9SjJLyKpTX1KJCW4fS6loUFJXixxvpOObpjosuDK0RDC2hQ8XSw9ZdlXsVuOuoOP+TDwHL8hPXjZTfXStP5OLeSkNTyPtC6/keyKI9P7N1Nvz270R4SAiio2MREx1ntKnt23B+6zjkH2PouDAYDUFDhWc+SkOVUXRdz9TvVw6ystB4dVz9zNTyq0vfU2SuVZwp3ilD2QEZqo/bCe3nhgvN4UwsOsmke7SIdE8TcrwZSgOYpIvoIbaHjxCqjv1CKD8oxzNq7x2qNEvFRfl2dvt5e3uN1cp7G2UVpe4yVHgpUXNkAJqCRoptYaOEtvD3TQgbIzQFjhSrD9ui0kuBsj1yOkjyqgwHKwdLztd+0F+2f2fQ7dUK16yN8twcp55i0c43UOHRA1X75EZwu1j1JnKcZBLFPLzloFAlO/Qb+gpXNwc/cJYrNe5T6vLeM2+sUq5Lc1T6pDsqTpNI8C0Hpe/N1cr1V75WzEr+ys7askojx2v/gbJccXdaZSnYnSr/DajjOYPLwd8hAAAAAElFTkSuQmCC',
    'house' :       'data:image/png;base64,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',
    'money' :       'data:image/png;base64,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',
    'rocket' :      'data:image/png;base64,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',
    'money-wings' : 'data:image/png;base64,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',
    'lupa' :        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAG2klEQVR42rWXe1BTRxSHsbW2tjNVq/hqO21F6/RBfVDtQ6oiioVWFDrBisBU26HVig9KRWixqQojCMQgBlAEA/gggoCU+mpyY1AkCWAJIIEiIFEeQiFN4k3Ivbmnu8Honclg+EN35jebvbs535yze87d68RuIpHo2UejlOezJe0+Rcqu+Au1PcWyxl5CcUt76W8NmVPVborIu9a3wLYSAJ7hIjmNsIGT0zMsKDyEZly4FXiyvO3G2YpmKLteD3/KFHCpvBJk8mqoaWiG1q5+aL9noFv/ZS4XVP+30s6Gg2YH3ZFcMfaYuD3ndHkLZBach/RjWaazRcV3pVdkzXJl9U25okr9l0RyO1+UrxUViODW7Q4YMAKoOike+vsoO/hIoMmiirFZ4rZLJ4gGOMBPpS5evNSqudOlIE3mKxQDBABIsBgAqf4+eV3d3KLOPi78r6ioACgAaOq15NpscrkjD7tTNqHJE16ug2Q+33Cz8R+ViWKkyCBBIzFIwBJN0wRFURLjoFlRWFzSl552CIwWgIZuKmpoz0fodc61vuDsy2rYn8QzN7W01iIPJSaKlhrNZsJkNCKRhNEmPDaZCJ1OK9XpdBIzRVcKc/MGCs6IoKNXry+p7Z09IniFBsbmXNGoEtJPgFRW3mKmGcJgNEr1ej2h1+skBgPq0W8EIbRarVUYqNPrJf39/VKDgRR3dnXVxcXtM9XUq0F1Wxs/BHYQ7tJGWJVRegNSDqWSPX39lSRpIAwYigzrEUzHlhWuewjXovHAwABhIElZaWlpd/qRoyCVq+qrOuFFh3tdoiKTUk5cgLKysg6j0Sw16FkQrMfAbb3BYJA03GxU742Ng9yTZ8zl1Y1u2DZBEKOHBRcqu8uSMvKgSqlsNJvNEh0yxDZqg2vtwTbh6Ijv3O2sSeAdpFMOHkJOSAKs9SAj47lhwcWKdmVCSjrcbGioI41GiS2Mj/oHIN0j4TGew7KBu+/dU/IFGaa9MVw4KTwZhm2HhoYODy5TNl1NSBFAQ319PQYPsMAs2cHZazC4s6unOjElbTBiy1Y4mirY7hB8pabpNE9wBOTy6y0oTfBhscHswGzvWZHBeyxuaeuoj/o9jgkNCoI0Hm+9Q3CduuUXVBqh5Ny5XgS+agUP67XWbg6vR5EirslvaAI3hMKGtQHGAqHwg6FTzR3+cPX39yzKFR4DHp8PKC9VJEla89Nm3BEcp13vgE6ZmpljWO7lDT9t+oGw5TDqRw0LxpPSi0Wy32KioVKu6GNougIbxHDHHg8QuLSKyxVdfutCwMdzGeyPDA96YHoM8vjxReRum2r1EX4sxHD3gOaOphMArmJP+hDcbs/RGD/D82YapFUq9e0ftkUwHgj6a1QMFBSfx6/JhyHmcDjDlk5rOOSSc+kxO8MgLiHJ0tbefs/CWGpompbi0ONTi7wU4x6NxaiOEzqSksvkNzo3bf8ZFnssg8joXxixtBx27o7TIHMd7p95xtsAS5cutd9r1n48Jy49dWZX+GYIj4yCyxLp/c6u7g6jabCOommlmWEqSTOt6NXer61Vt7Zn5op0Pv5fw+z35oDXF6uZ7T9HwpZtO8Dd0xe27toL3n7r4Z335p16PJx15bl6oXBP7O4I43cbQyAqZjekZWZBflHJYOEf5+8fzy8k9xzg037rN8DMd13Ba8Vy+HZDMIQErQOXd+YBNrXiC39L4uHjVFJaLr1y9TqYM3ehaMRwTWOVa35WKn9P9PbmTd8GWUICOcDx94UvvVeAj5cHBPivGty6+XtZLDc6JFvAW8Px8+1xemk6zHB52/LGmzPAP2A9JKcdtyQKcqnP1wQi+ALRSMKOZBv/+zLx5+mP844eDBIk7Qvn7edGpCTFfnNKmDbP9r51C+W++O4HH3bj5ePHTzCPGz8Bpk5/DfzXWuFMoiCHWrk6EObOX5jvAO406sFtcwTXFzdrZdr2U1Ssx4rPcagtzlOmWl6Z6AxTp706BBdkMyjsVs/fd3XDnjtuOA8JVH0yUOkLxXJzs/a4IuH8Z+fpjshfMxct8cRw2nnyEHz6q6+DX0CgFZ54WEh5+wXBnPkfZTs9icbh2M4G9jw6+9PPPFjwSTANwf3XBkHi4SxLbHI6vczbH9yXeGx+InB2TQ4L34XgS63wSZOnWOGTp0xjOIEh8Hv8wcHg736EuXPnKfDaJw7fsmNn1ifuQ/CJk5zpl8eNh7dcZoGXj6/JfbEHLFywQIDXPRX4pq0RWR8tWgzW0z5homkC0vNjXoCZLi5NYWFhznjNU4Nv/P5Hnuuc+TY4zJw1q9nX13f2ow+oJ9zYH3+r1nz1lYvLrLOurq7xwcHBkx88Hv0/Z2L6Y6umcwQAAAAASUVORK5CYII=',
    'chart':        'data:image/png;base64,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',
    'computer' :    'data:image/png;base64,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',
    'trex' :        'data:image/png;base64,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',
    'satellite' :   'data:image/png;base64,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',
    'bolt' :        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAACoFBMVEUAAAAAAAD/AAD//wD/AAD/gAD//wCqqgCqqlX/VQD/qgD/qlW/gED/gAD/vwD/v0D/ZgD/mQD/mTP/gACS/0n/tgCzs4DmMwDmM7P/mRrfMAD/nwDS0jz/KADzrgz/ogDqQADruh31nQD1nWL1p071p2z1sRT/kgD2wQD3pVr/mwj/qgDzXQDpgAD5lgvvOgD/owD2dgD7ngv0igD0mgf2lQD8nQDysAD1nSL1mwD2wBP7oA34mAD0hgD2dgD5oiz/rwD/mwD/pwD/shT9nwb/iwD3oBr5ogb5qBz5qCj5qh77nAD9lAD/jgD9nwb/kQD/lQD/pwD9oAD9ngD9qgD/nAD/swD4pS37lwX/nQD/swD/mwD8mAP6py/8qhX5kAD5qCT8rRz+lQH6iQD7pSD6wwD7ox/+mAL+mwH+ogf7sgD+mAX+ogX9t0L+nQD+nBD+vh/+mQf+uwD/yAD+qAf+qQD+rgD+sgD+tQD9lgD9vT7/lwD9ngD/44X+mwH+/+n//q3//9z//sH//8v+kwD/wDH/3oH//93++rr++73+/MD+/MH+/+D+/+T/34L/+8H//8H//9P//9r//9z//+D/zAD//cH//+T//+j+twD+/b//34v/5o7/75X/9rD//9n+vgD/lgD/lwD/nQD/ngD/ngL/nwD/oAD/owD/pwD/qAD/qgD/qhz/qwD/sBL/sQH/sRH/sgD/uAL/uwD/vwD/wUT/wgD/xAD/xgD/xw//yCn/y1f/1CX/117/12n/13f/133/21f/3Cn/3X3/3jn/34f/4pT/4pn/5Ev/5Wn/5Zf/53b/55T/6HT/6Ir/6X7/6YP/6m//6or/7If/7pX/7pr/8I3/8Yz/96H/98P/+bL/+r7//Kz//c3//9v//+Tn2YQ4AAAAoHRSTlMAAQEBAgICAwMDAwMEBAQEBQUFBgcHCgoKChAQERMWFhgaGhoaGhocHR8hJCkuLjAyNkRGR1dgZGhrbnN0dnd5eX19fn+AgYGBgYGBgYGCgoKCg4SHiImNjpKUlpmdqK2vvb7AwMTMzc7S09fX2eLj5OXn5+jo6Ojo8fL19/j5+fn5+vr7+/v7/Pz8/Pz8/Pz8/Pz8/P39/f3+/v7+/v7+v0L4qgAAAY9JREFUeAFjwABcDAxm8gysMC6mbGQ0AwMTdllOBobQOnUGXpyyTjv94LKYJjseKpAF0jhkXfeetGEQwirLwcDgu/tOrhQDGw69PrsmHLXEbjM7A4P39qbbWWIMrNhl3bfMaz9oziDKwQUCzGgmu228Wn8jFSHEjKLXc+Wc3rtHrCQ0lVVVlNTktKQZmJD0eiw7POne2anFRRXlZaUledUZ2gysCFmvxQcm358/98L1a5fPnzu9aWmhASxsQKqcF7U29Hd0ds2a1j1xRk/t6jRFuCwzA1vU+kVrNmzetn3HtpkLbk5vW50iwyAIs5iNQSMs2CXAPygwxCFu+fEpfWsTRMCymD6I3984e1UsA1qos3KCgDCD7dbmYyvCGRj4sYSbAINuza1TS+wZGHiQhRHuT75yZqEFAwM3tijhY7Dbd6nFlIEFayrkZdCvulhpzMDJzIDVaMbEE/mGDLwQWUyjrffk6ACdhxUIMuity1QAUrjSYHa6OC5ZJmaGiCROuCymu4xiWDFlEaFuIoldFgAJAGZ2QguNEQAAAABJRU5ErkJggg==',

    // add more here 
} 

const Emoji = ({name, size, c}) => (
    <div style={{display:'inline-block', height:(size || '1.1em'), verticalAlign:'middle', marginLeft:'.2em', marginRight:'.2em'}}>
        {[ ...new Array(c || 1)].map((x,i)=><img key={i} src={emojiPolyfillImages[name]} height='100%' />)}
    </div>
)

export default Emoji