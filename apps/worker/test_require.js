try {
    const config = require("@dataflow/config");
    console.log("Config loaded:", !!config);
    console.log("Env:", !!config.env);
} catch (e) {
    console.error("Error loading config:", e);
}
