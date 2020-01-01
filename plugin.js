//Converted with C2C3AddonConverter v1.0.0.8
"use strict";

{
	const PLUGIN_ID = "Rex_NGIO_Scoreboard";
	const PLUGIN_VERSION = "0.1.0.1";
	const PLUGIN_CATEGORY = "web";

	let app = null;

	const PLUGIN_CLASS = SDK.Plugins.Rex_NGIO_Scoreboard = class Rex_NGIO_Scoreboard extends SDK.IPluginBase
	{
		constructor()
		{
			super(PLUGIN_ID);
			SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());
			this._info.SetName(lang(".name"));
			this._info.SetDescription(lang(".description"));
			this._info.SetVersion(PLUGIN_VERSION);
			this._info.SetCategory(PLUGIN_CATEGORY);
			this._info.SetAuthor("Rex.Rainbow/Port by Pixel Perfect Studio");
			this._info.SetHelpUrl(lang(".help-url"));
			this._info.SetIsSingleGlobal(false);
			this._info.SetIsDeprecated(false);
			this._info.SetSupportedRuntimes(["c2","c3"]);
			
			SDK.Lang.PushContext(".properties");
			this._info.SetProperties([
				new SDK.PluginProperty("integer", "id", 0),
				new SDK.PluginProperty("integer", "lines", 10),
				new SDK.PluginProperty("combo", "period", {initialValue:"current day", items:["current day","current week","current month","current year","all-time"]}),
				new SDK.PluginProperty("text", "tag", ""),
				new SDK.PluginProperty("text", "boardname", ""),
				new SDK.PluginProperty("check", "debug", "")
			]);
			SDK.Lang.PopContext();		// .properties
			SDK.Lang.PopContext();
		}
	};
	PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}
