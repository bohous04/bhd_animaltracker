local mpffreemode = `mp_f_freemode_01`
local mpmfreemode = `mp_m_freemode_01`

Citizen.CreateThread(function()
    Wait(1500)
    Bridge = exports["bhd_bridge"]:getBridge()
    SendLocalesToUI()
    exports.ox_target:addGlobalPlayer({
        {
            name = "bhd_tracking",
            icon = "fa-solid fa-paw",
            items = "animal_tracker",
            label = locale("animal_target"),
            canInteract = function(entity, distance, coords, name, bone)
                local model = GetEntityModel(entity)
                if model == mpmfreemode or model == mpffreemode then
                    return false
                end
                return true
            end,
            event = "bhd_animalLocator:useTracker"
        },
        {
            name = "bhd_tracking_remove",
            icon = "fa-solid fa-x",
            label = locale("animal_target_remove"),
            canInteract = function(entity, distance, coords, name, bone)
                local model = GetEntityModel(entity)
                if model == mpmfreemode or model == mpffreemode then
                    return false
                end
                return true
            end,
            event = "bhd_animalLocator:removeTracker"
        },
    })
end)

AddEventHandler("bhd_bridge:playerLoaded", function ()
    local ped = cache.ped
    local model = GetEntityModel(ped)
    if model == mpmfreemode or model == mpffreemode then
        return false
    end
    TriggerServerEvent("bhd_animalLocator:animalConnected", ped)
end)

function Notify(msg, type, time, title)
    if not type then type = locale("notify_type_info") end
    if not time then time = 5000 end
    if not title then title = locale("notify_title_default") end
    Bridge.Notify(title, msg, time, type)
end

AddEventHandler("bhd_animalLocator:useTracker", function(data)
    local target = data.entity
    local targetPlayer = NetworkGetPlayerIndexFromPed(target)
    local targetId = GetPlayerServerId(targetPlayer)
    local input = lib.inputDialog(locale("input_title"), {
        {type = 'input', label = locale("input_name"), required = true},
        {type = 'input', label = locale("input_image"), required = false},
    })
    if not input or not input[1] then return end
    local name = input[1]
    local image = input[2]
    TriggerServerEvent("bhd_animalLocator:useTracker", targetId, target, name, image)
end)

AddEventHandler("bhd_animalLocator:removeTracker", function(data)
    local target = data.entity
    local targetPlayer = NetworkGetPlayerIndexFromPed(target)
    local targetId = GetPlayerServerId(targetPlayer)
    TriggerServerEvent("bhd_animalLocator:removeTracker", targetId)
end)

RegisterNetEvent("bhd_animalLocator:showAnimal", function (animalCoords, animalName)
    local blip = AddBlipForCoord(animalCoords)
    SetBlipSprite (blip, 171)
    SetBlipDisplay(blip, 2)
    SetBlipScale  (blip, 0.65)
    SetBlipColour (blip, 57)
    SetBlipAsShortRange(blip, true)
    SetBlipHighDetail(blip, true)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentSubstringPlayerName("<FONT FACE='Oswald'>"..locale("animal_blip", animalName).."</FONT>")
    EndTextCommandSetBlipName(blip)
    Wait(60000)
    RemoveBlip(blip)
end)