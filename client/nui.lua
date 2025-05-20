local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendNUIMessage({
        action = 'setVisible',
        data = shouldShow
    })
end

RegisterCommand(Config.CommandName, function()
    local animals = lib.callback.await('bhd_animalLocator:getAnimals', false)
    if not animals or not next(animals) then
        Notify(locale("no_animals_found"), "error", 5000, locale("notify_title_default"))
        return
    end
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'setVisible',
        data = {
            visibility = true,
            allAnimals = animals,
        }
    })
end)

RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    cb(true)
end)

RegisterNUICallback('findAnimal', function(data, cb)
    local animal = data.animal
    TriggerServerEvent("bhd_animalLocator:findAnimal", animal)
    cb(true)
end)

RegisterNUICallback('renameAnimal', function(data, cb)
    local animal = data.animal
    local newName = data.newName
    TriggerServerEvent("bhd_animalLocator:changeAnimalName", animal, newName)
    cb(true)
end)

RegisterNUICallback('changeAnimalImage', function(data, cb)
    local animal = data.animal
    local newImage = data.newImage
    TriggerServerEvent("bhd_animalLocator:changeAnimalImage", animal, newImage)
    cb(true)
end)

function SendLocalesToUI()
    SendNUIMessage({
        action = "setTranslations",
        data = json.encode({
            translations = {
                ui_find = locale("ui_find"),
                ui_rename = locale("ui_rename"),
                ui_change_image = locale("ui_change_image"),
                ui_title = locale("ui_title"),
                ui_help = locale("ui_help"),
                ui_form_button_cancel = locale("ui_form_button_cancel"),
                ui_form_button_confirm = locale("ui_form_button_confirm"),
                ui_form_rename_text = locale("ui_form_rename_text"),
                ui_form_rename_title = locale("ui_form_rename_title"),
                ui_form_rename_desc = locale("ui_form_rename_desc"),
                ui_form_change_image_title = locale("ui_form_change_image_title"),
                ui_form_change_image_desc = locale("ui_form_change_image_desc"),
                ui_form_change_image = locale("ui_form_change_image"),
            },
            sortingType = currentSortingType
        })
    })
end