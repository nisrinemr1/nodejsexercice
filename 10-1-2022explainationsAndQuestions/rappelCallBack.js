function on(event , tutu)
{
    if(event == "data")
    {
        setTimeout(() => {
            let body = "Bon appétit !"
            tutu(body)
        }, 1500)
    }
}


on('data', (body1) => {
    console.log(body1)
})