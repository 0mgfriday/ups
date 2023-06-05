#!/usr/bin/env node

import fetch from 'node-fetch';

const search = "walmart";

// await searchNpm(search)
// await searchNuget(search)
// await searchMaven(search)
await searchDockerhub(search)

async function searchNpm(query) {
    const response = await fetch(`https://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(query)}`);
    if (response.ok) {
        const data = await response.json();
    
        data.objects.forEach(obj => {
            console.log(obj.package.name)
            console.log(obj.package.description ?? '[No description]')
            console.log(obj.package.links.npm)
            console.log()
        })
    } else {
        console.warn('npm search failed');
    }
}

async function searchNuget(query) {
    const response = await fetch(`https://azuresearch-usnc.nuget.org/query?q=${encodeURIComponent(query)}&prerelease=true`);
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

async function searchMaven(query) {
    const response = await fetch(`https://search.maven.org/solrsearch/select?q=${encodeURIComponent(query)}&start=0&rows=20`);
    if (response.ok) {
        const data = await response.json();
    
        data.response.docs.forEach(obj => {
            console.log(obj.id)
            console.log('[No description]')
            console.log(`https://search.maven.org/artifact/${obj.g}/${obj.a}`)
            console.log()
        })
    } else {
        console.warn('npm search failed');
    }
}

async function searchDockerhub(query) {
    const response = await fetch(`https://hub.docker.com/api/content/v1/products/search?page_size=20&q=${encodeURIComponent(query)}&type=image"`, {
        headers: {'Search-Version': 'v3'}
    });
    if (response.ok) {
        const data = await response.json();
        
        data.summaries.forEach(obj => {
            let description = obj.short_description
            if (description == "") {
                description = "[No description]"
            }

            console.log(obj.name)
            console.log(description)
            console.log(`https://hub.docker.com/r/${obj.name}`)
            console.log()
        })
    } else {
        console.warn('npm search failed');
    }
}