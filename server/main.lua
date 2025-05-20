local Animals = {}
local mpffreemode = `mp_f_freemode_01`
local mpmfreemode = `mp_m_freemode_01`

Citizen.CreateThread(function()
    Wait(1500)
    Bridge = exports["bhd_bridge"]:getBridge()
    Animals = MySQL.Sync.fetchAll('SELECT * FROM bhd_animaltracker', {})
end)

function GetAnimalIndex(pedIdentifier, owner)
    for k, v in pairs(Animals) do
        if v.pedIdentifier == pedIdentifier and v.owner == owner then
            return k
        end
    end
    return nil
end

function ServerNotify(source, msg, type, time, title)
    if not type then type = locale("notify_type_info") end
    if not time then time = 5000 end
    if not title then title = locale("notify_title_default") end
    Bridge.ServerNotify(source, msg, time, type, title)
end

RegisterNetEvent("bhd_animalLocator:findAnimal", function (animal)
    local source = source
    local animalIdentifier = animal.pedIdentifier
    local ownerIdentifier = animal.owner
    local animalId = GetAnimalIndex(animalIdentifier, ownerIdentifier)
    if not animalId then
        ServerNotify(source, locale("animal_not_found"), locale("notify_type_error"))
        return
    end
    local ownerSource = Bridge.GetPlayerFromIdentifier(ownerIdentifier).source
    local animalPlayer = Bridge.GetPlayerFromIdentifier(animalIdentifier)
    if ownerSource ~= source then
        Bridge.Ban(source, 'animal locator, trying to find an animal that is not his')
        return
    end
    if animalPlayer and animalPlayer.source then
        local animalPed = GetPlayerPed(animalPlayer.source)
        local animalCoords = GetEntityCoords(animalPed)
        TriggerClientEvent("bhd_animalLocator:showAnimal", source, animalCoords, animal.name)
        ServerNotify(source, locale("animal_location", animal.name), locale("notify_type_success"))
    else
        ServerNotify(source, locale("animal_offline"), locale("notify_type_info"))
    end
end)

RegisterNetEvent("bhd_animalLocator:changeAnimalName", function (animal, newName)
    local source = source
    local animalIdentifier = animal.pedIdentifier
    local ownerIdentifier = animal.owner
    local animalId = GetAnimalIndex(animalIdentifier, ownerIdentifier)
    if not animalId then
        ServerNotify(source, locale("animal_not_found"), locale("notify_type_error"))
        return
    end

    local ownerSource = Bridge.GetPlayerFromIdentifier(ownerIdentifier).source
    if ownerSource ~= source then
        Bridge.Ban(source, 'animal locator, trying to change name of an animal that is not his')
        return
    end
    MySQL.update.await('UPDATE bhd_animaltracker SET name = "'..newName..'" WHERE id = "'..animalId..'"')
    Animals[animalId].name = newName
    ServerNotify(source, locale("animal_name_changed", newName), locale("notify_type_success"))
end)

RegisterNetEvent("bhd_animalLocator:changeAnimalImage", function (animal, newImage)
    local source = source
    local animalIdentifier = animal.pedIdentifier
    local ownerIdentifier = animal.owner
    local animalId = GetAnimalIndex(animalIdentifier, ownerIdentifier)
    if not animalId then
        ServerNotify(source, locale("animal_not_found"), locale("notify_type_error"))
        return
    end

    local ownerSource = Bridge.GetPlayerFromIdentifier(ownerIdentifier).source
    if ownerSource ~= source then
        Bridge.Ban(source, 'animal locator, trying to change image of an animal that is not his')
        return
    end
    MySQL.update.await('UPDATE bhd_animaltracker SET image = "'..newImage..'" WHERE id = "'..animalId..'"')
    Animals[animalId].image = newImage
    ServerNotify(source, locale("animal_image_changed"), locale("notify_type_success"))
end)

lib.callback.register('bhd_animalLocator:getAnimals', function(source)
    while not Bridge do
        Wait(100)
    end
    local playerIdentifier = Bridge.GetIdentifier(source)
    local playerAnimals = {}
    local index = 1
    for k, v in pairs(Animals) do
        if v.owner == playerIdentifier then
            table.insert(playerAnimals, {
                id = index,
                name = v.name,
                image = v.image,
                pedIdentifier = v.pedIdentifier,
                owner = v.owner
            })
            index += 1
        end
    end
    return playerAnimals
end)

RegisterNetEvent("bhd_animalLocator:useTracker", function(targetId, entity, name, image)
    local source = source
    local model = GetEntityModel(NetworkGetEntityFromNetworkId(entity))
    if model == mpmfreemode or model == mpffreemode then
        Bridge.Ban(source, 'animal locator, trying to use tracker on a player')	
        return
    end
    local targetIdentifier = Bridge.GetIdentifier(targetId)
    local hasCollar = false
    for k, v in pairs(Animals) do
        if v.pedIdentifier == targetIdentifier then
            hasCollar = true
            ServerNotify(source, locale("animal_tracker_already_exists"), locale("notify_type_error"))
            return
        end
    end
    local ownerIdentifier = Bridge.GetIdentifier(source)
    Bridge.RemoveItem(source, Config.itemName, 1)
    MySQL.insert.await("INSERT INTO bhd_animaltracker (owner, pedIdentifier, name, image) VALUES (?, ?, ?, ?)",{ ownerIdentifier, targetIdentifier, name, image })
    local index = #Animals+1
    Animals[index] = {
        id = index,
        name = name,
        image = image,
        pedIdentifier = targetIdentifier,
        owner = ownerIdentifier
    }
    ServerNotify(source, locale("animal_tracker_added", name), locale("notify_type_success"))
end)

RegisterNetEvent("bhd_animalLocator:removeTracker", function(targetId)
    local source = source
    local targetIdentifier = Bridge.GetIdentifier(targetId)
    local animalId
    for k, v in pairs(Animals) do
        if v.pedIdentifier == targetIdentifier then
            animalId = k
            MySQL.query.await('DELETE FROM bhd_animaltracker WHERE owner = ? and pedIdentifier = ?', { v.owner, v.pedIdentifier })
            Animals[k] = nil
        end
    end
    if not animalId then
        ServerNotify(source, locale("animal_tracker_not_found"), locale("notify_type_error"))
        return
    end
    
    ServerNotify(source, locale("animal_tracker_removed"), locale("notify_type_success"))
end)

RegisterNetEvent("bhd_animalLocator:animalConnected", function ()
    local source = source
    local pedIdentifier = Bridge.GetIdentifier(source)
    local animalId
    for k, v in pairs(Animals) do
        if v.pedIdentifier == pedIdentifier then
            animalId = k
            break
        end
    end
    if not animalId then
        return
    end
    local owner = Animals[animalId].owner
    local ownerData = Bridge.GetPlayerFromIdentifier(owner)
    if ownerData and ownerData.source then
        ServerNotify(source, locale("animal_connected", Animals[animalId].name), locale("notify_type_info"))
    end
end)