let uri = `${location.href}/v1`
addEventListener("submit", async(e)=> {
    console.log(location.href)
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    let config = {
        method: e.target.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    let peticion = await fetch(uri, config);
    let res = await peticion.json();
    if(res.status==201) location.href = "/login";
    alert(JSON.stringify(res))
})