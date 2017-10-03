async function long() {
    setTimeout(() => {
        console.log('111')
    }, 2000);
}

function xxx() {
    var result = await long()
    return result
}

xxx();
