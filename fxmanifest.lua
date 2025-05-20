fx_version 'cerulean'
lua54 'yes'
game 'gta5'
name 'bhd_animaltracker'
version '1.0.0'
author 'BHD SCRIPTS'
documentation 'https://docs.bhdscripts.com/scripts/bhd-animalTracker'
discord 'https://discord.gg/xZZu23AcpP'
description 'Animal tracker, so you don\'t lose your pets'

files {
    'web/build/index.html',
    'web/build/**/*',
    'locales/*.json'
}

shared_scripts {
    '@ox_lib/init.lua',
    'config.lua'
}

client_scripts {
    'client/*.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/*.lua'
}

ui_page 'web/build/index.html'