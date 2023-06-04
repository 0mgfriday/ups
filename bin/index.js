#!/usr/bin/env node

import fetch from 'node-fetch';

const search = "walmart";

// await searchNpm(search)
// await searchNuget(search)

async function searchNpm(query) {
    const response = await fetch('https://registry.npmjs.com/-/v1/search?text=' + encodeURIComponent(query));
    if (response.ok) {
        const data = await response.json();
    
        data.objects.forEach(obj => {
            console.log(obj.package.name)
            console.log(obj.package.description)
            console.log(obj.package.links.npm)
            console.log()
        })
    } else {
        console.warn('npm search failed');
    }
}

async function searchNuget(query) {
    const response = await fetch('https://azuresearch-usnc.nuget.org/query?q=' + encodeURIComponent(query) + '&prerelease=true');
    if (response.ok) {
        const data = await response.json();
    
        data.data.forEach(obj => {
            let description = obj.description
            if (obj.description != null && obj.description.length > 50) {
                description = obj.description.slice(0, 50)
            }

            console.log(obj.title)
            console.log(description)
            console.log(obj.registration)
            console.log()
        })
    } else {
        console.warn('npm search failed');
    }
}