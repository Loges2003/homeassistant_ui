$(document).ready(function () {
    function updateSwitchUI(switchId, newState) {
        let switchElement = $("#" + switchId);
        let currentState = switchElement.is(":checked") ? "on" : "off";

        // Update only if there's a state change
        if (currentState !== newState) {
            switchElement.prop("checked", newState === "on");
            $("#switchStatus" + switchId.replace("switch", "")).text(newState === "on" ? "ON" : "OFF");
        }
    }

    function fetchSwitchState(switchId, entityId) {
        $.get("/get_switch_state?entity=" + entityId, function (data) {
            updateSwitchUI(switchId, data.state);
        });
    }

    function updateDoorStatus() {
        $.get("/get_door_status", function (data) {
            let currentIcon = $("#doorIcon").attr("src");
            let newIcon = "/static/" + (data.status === "open" ? "door_open.png" : "door_closed.png");

            // Update only if there's a change
            if (currentIcon !== newIcon) {
                $("#doorIcon").attr("src", newIcon);
            }
        });
    }

    function updateRGBStatus() {
        $.get("/get_rgb_status", function (data) {
            let newValue = data.brightness;
            let slider = $("#rgbSlider");
            let statusText = $("#rgbStatus");

            // Update only if value changes
            if (slider.val() != newValue) {
                slider.val(newValue);
                statusText.text(newValue + "%");
            }
        });
    }

    function updateCurtainStatus() {
        $.get("/get_curtain_status", function (data) {
            let newValue = data.position;
            let slider = $("#curtainSlider");
            let statusText = $("#curtainStatus");

            // Update only if value changes
            if (slider.val() != newValue) {
                slider.val(newValue);
                statusText.text(newValue + "%");
            }
        });
    }

    // Periodic Updates (Reduced Refresh Rate to 3 seconds)
    setInterval(function () {
        updateDoorStatus();
        updateRGBStatus();
        updateCurtainStatus();

        for (let i = 1; i <= 5; i++) {
            fetchSwitchState("switch" + i, "switch.hogar_" + i);
        }
    }, 4000);
});
