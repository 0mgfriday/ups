#!/usr/bin/env node

import fetch from 'node-fetch';
import chalk from 'chalk';

const log = console.log;
const search = "walmart";

await searchNpm(search)
await searchNuget(search)
await searchMaven(search)
await searchDockerhub(search)

function logName(name) {
    log(chalk.green(name))
}

async function searchNpm(query) {
    const response = await fetch(`https://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(query)}`);
    if (response.ok) {
        const data = await response.json();
    
        data.objects.forEach(obj => {
            logName(chalk.green(obj.package.name))
            log(obj.package.description ?? '[No description]')
            log(obj.package.links.npm)
            log()
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

            logName(obj.title)
            log(description)
            log(obj.registration)
            log()
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
            logName(obj.id)
            log('[No description]')
            log(`https://search.maven.org/artifact/${obj.g}/${obj.a}`)
            log()
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

            logName(obj.name)
            log(description)
            log(`https://hub.docker.com/r/${obj.name}`)
            log()
        })
    } else {
        console.warn('npm search failed');
    }
}