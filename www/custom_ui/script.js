const HA_URL = "http://192.168.0.110:8123";
const HA_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjM2Q3N2RmYTkwNmI0NTBlYmNlYWQzZGUyNDU5ZTE3MCIsImlhdCI6MTc0MzIzMDgzMSwiZXhwIjoyMDU4NTkwODMxfQ.j0k1D6PwVs_gl87xgOhUKZZHEio7DQ0mKxVEo5Y-NGg";

function toggleEntity(entityId) {
  fetch(`${HA_URL}/api/services/homeassistant/toggle`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HA_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ entity_id: entityId })
  });
}

function setBrightness(value) {
  fetch(`${HA_URL}/api/services/light/turn_on`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HA_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ entity_id: "light.led", brightness_pct: parseInt(value) })
  });
}

function setCurtain(value) {
  fetch(`${HA_URL}/api/services/cover/set_cover_position`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HA_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ entity_id: "cover.curtain", position: parseInt(value) })
  });
}
