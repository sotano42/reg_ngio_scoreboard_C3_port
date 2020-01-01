"use strict";

{
	C3.Plugins.Rex_NGIO_Scoreboard.Instance = class SingleGlobalInstance extends C3.SDKInstanceBase
	{
		constructor(inst, properties)
		{
			super(inst);
			
			this.periodCode = ["D", "W", "M", "Y", "A"];
			
			this.socialUser = null;
			this.pageIndex = 0;

			this.ngio = null;
			this.lastResult = null;
			this.lastBoards = null;
			this.lastScores = null;
			this.lastScoresStartIndex = 0;
			this.exp_CurBoard = null;
			this.exp_LoopIndex = null;
			
			this.exp_CurScore = null;
			
			if (properties)		// note properties may be null in some cases
			{
				this.scoreboardID = properties[0];
				this.limit = properties[1];
				this.period = this.periodCode[properties[2]];
				this.tag = properties[3];
				this.boardname = properties[4];
				this.debug = properties[5];
			}
		}
		
		Release()
		{
			super.Release();
		}
		
		SaveToJson()
		{
			return {
				// data to be saved for savegames
			};
		}
		
		LoadFromJson(o)
		{
			// load state for savegames
		}
		
		onDestroy(){
			this.lastResult = null;
			this.lastBoards = null;
			this.lastScores = null;			
		}
		
		GetNGIO(){
			if (this.ngio != null)
				return this.ngio;

			if (C3.Plugins.Rex_NGIO_Authentication) {
					this.ngio = C3.Plugins.Rex_NGIO_Authentication.Instance.prototype.GetNGIO();
					return this.ngio;
			}
			
			alert(this.ngio, "NGIO.ScoreBoard: Can not find NGIO Authentication oject.");
			return null;
		}
		
		GetSkip(pageIndex) {
			if (pageIndex == null)
				pageIndex = this.pageIndex;

			return pageIndex * this.limit;
		}
		
		GetScoresInRange(skip, limit) {
			var self = this;
			
			var getScores = function (result) {
				/*alert("gotScores called!");
				window.Res=result;*/
				self.lastScoresStartIndex = skip;

				if (result["success"]) {
					self.lastScores = [];
					var scores = result["scores"], score, user;

					var i, cnt = scores.length;
					
					for (i = 0; i < cnt; i++) {
						//window.CurScore=scores[i];
						score = scores[i];
						user = score["user"];
						self.lastScores.push({
							"formatted_value": score["formatted_value"],
							"user": {
								"id": user["id"],
								"name": user["name"],
							},
							"value": score["value"],
						})
					}
					//window.lastScores=self.lastScores;					
				}
				else {
					self.lastScores = null;
				}
			};
			var cnds = C3.Plugins.Rex_NGIO_Scoreboard.Cnds;
			var callback = this.getHandler(this, cnds.OnGetScoresSuccess, cnds.OnGetScoresError, getScores);
			var param = {
				"id": this.scoreboardID,
				"limit": limit,
				"period": this.period,
				"skip": skip,
			};

			if (this.tag !== "")
				param["tag"] = this.tag;

			if (this.socialUser !== null) {
				param["social"] = true;
				param["user"] = this.socialUser;
			}
			this.GetNGIO()["callComponent"]("ScoreBoard.getScores", param, callback);
		};
		
		getHandler(self, successTrig, errorTrig, callback) {
			var handler = function (result) {
				if (callback)
					callback(result);

				self.lastResult = result;
				var trig = (result["success"]) ? successTrig : errorTrig;
				self.Trigger(trig);
			};
			return handler;
		};
	};
}