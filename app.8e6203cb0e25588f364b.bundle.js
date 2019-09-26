/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "8e6203cb0e25588f364b";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"news":"news"}[chunkId]||chunkId) + "." + hotCurrentHash + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/assets/index.css":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/postcss-loader/src!./src/assets/index.css ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"body,\\np,\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6,\\nul,\\nli,\\ninput {\\n    padding: 0;\\n    margin: 0;\\n    color: #333333;\\n    font-weight: normal;\\n    box-sizing: border-box;\\n}\\n\\nh1 {\\n    font-size: 48px;\\n}\\n\\nh2 {\\n    font-size: 36px;\\n}\\n\\nh3 {\\n    font-size: 32px;\\n    font-weight: 500;\\n}\\n\\nh5 {\\n    font-weight: 400;\\n    font-size: 20px;\\n    color: #FFFFFF;\\n}\\n\\np {\\n    font-size: 14px;\\n    color: #666666;\\n}\\n\\nh6 {\\n    font-size: 18px;\\n}\\n\\na {\\n    color: inherit;\\n    text-decoration: none;\\n}\\n\\nul {\\n    list-style: none;\\n    display: flex;\\n}\\n\\ninput {\\n    background-color: transparent;\\n    border: 1px solid #DDE1E3;\\n    padding: 0 16px;\\n    color: #FFFFFF;\\n    font-size: 14px;\\n}\\n\\ninput::-webkit-input-placeholder {\\n    color: #7A8C94;\\n    font-size: 14px;\\n}\\n\\ninput::-moz-placeholder {\\n    color: #7A8C94;\\n    font-size: 14px;\\n}\\n\\ninput:-ms-input-placeholder {\\n    color: #7A8C94;\\n    font-size: 14px;\\n}\\n\\ninput::-ms-input-placeholder {\\n    color: #7A8C94;\\n    font-size: 14px;\\n}\\n\\ninput::placeholder {\\n    color: #7A8C94;\\n    font-size: 14px;\\n}\\n\\n:focus {\\n    outline: none;\\n}\\n\\nbutton {\\n    background-color: transparent;\\n    border: 1px solid #EBEDEF;\\n    color: #FFFFFF;\\n    font-size: 14px;\\n}\\n\\nbutton:active,\\nbutton:hover {\\n    background-color: rgba(255, 255, 255, .1);\\n}\\n\\n/* 1vw = 14.4px */\\n/* 7vw = 100.8px = 1rem */\\n/* 约等于 1rem = 100px */\\nhtml {\\n    font-size: 7vw;\\n    width: 100vw;\\n}\\n\\n.site-header {\\n    display: flex;\\n    align-items: center;\\n    justify-content: space-between;\\n    padding: 0 1.17rem 0 1.21rem;\\n}\\n\\n.site-header > img {\\n    width: 1.26rem;\\n    min-width: 100px;\\n    height: auto;\\n}\\n\\n.site-header > img:hover {\\n    cursor: pointer;\\n}\\n\\n.large-screen-nav li {\\n    line-height: .66rem;\\n    height: .66rem;\\n    width: 114px;\\n    color: #666666;\\n    font-size: 16px;\\n    text-align: center;\\n    box-sizing: border-box;\\n}\\n\\n.large-screen-nav li:hover{\\n    border-bottom: 2px solid #007AFF;\\n    color: #007AFF;\\n}\\n\\n.small-screen-nav {\\n    display: none;\\n}\\n\\n.site-header a {\\n    color: inherit;\\n}\\n\\n.site-footer {\\n    background: #014A6D;\\n    padding: .42rem 2rem 0;\\n}\\n\\n.site-footer p {\\n    font-size: 16px;\\n    color: #EBEDEF;\\n    margin: .28rem 0;\\n    font-weight: 300;\\n}\\n\\n.site-footer>div {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: flex-start;\\n    flex-wrap: wrap;\\n}\\n\\n.site-footer input {\\n    display: block;\\n    width: 4.80rem;\\n    height: 48px;\\n    margin: .24rem 0;\\n}\\n\\n.site-footer button {\\n    display: block;\\n    width: 2.4rem;\\n    line-height: 48px;\\n    font-size: 14px;\\n    margin: .24rem 0 .42rem;\\n}\\n\\n.site-footer button:hover {\\n    cursor: pointer;\\n}\\n\\n\\n.site-footer ul {\\n    display: flex;\\n    font-size: 14px;\\n    color: #FFFFFF;\\n    margin: 0 -80px 0;\\n    line-height: .76rem;\\n}\\n\\n.site-footer li {\\n    color: #FFFFFF;\\n    margin-right: 30px;\\n}\\n\\n.site-footer ul li:nth-of-type(1) {\\n    flex-grow: 1;\\n}\\n\\n.site-footer li:last-of-type {\\n    margin-right: 0;\\n}\\n\\n@media (max-width: 768px) {\\n    h1 {\\n        font-size: 24px;\\n    }\\n\\n    h2 {\\n        font-size: 20px;\\n    }\\n\\n    h3 {\\n        font-size: 18px;\\n    }\\n\\n    h5 {\\n        font-size: 16px;\\n    }\\n\\n    h6 {\\n        font-size: 14px;\\n    }\\n\\n    p {\\n        font-size: 12px;\\n    }\\n\\n    header {\\n        height: 2.4rem;\\n    }\\n\\n    .site-header {\\n        padding: 0 .6rem;\\n        height: 2.4rem;\\n        position: fixed;\\n        top: 0;\\n        left: 0;\\n        right: 0;\\n        z-index: 3;\\n        background: #FFFFFF;\\n        box-sizing: border-box;\\n    }\\n\\n    .large-screen-nav {\\n        display: none;\\n    }\\n\\n    .small-screen-nav {\\n        display: block;\\n    }\\n\\n    .small-screen-nav img {\\n        width: .76rem;\\n        height: auto;\\n    }\\n\\n    .small-screen-nav nav {\\n        position: absolute;\\n        overflow: hidden;\\n        width: 100vw;\\n        top: 2.4rem;\\n        height: 0;\\n        left: 0;\\n    }\\n\\n    .small-screen-nav .visibleNav {\\n        height: 100vh;\\n        background: rgba(0, 0, 0, .4);\\n        border-top: 1px solid #f8f9f9;\\n    }\\n\\n    .small-screen-nav ul {\\n        display: block;\\n        text-align: center;\\n        transform: translate(-100px, 0);\\n    }\\n\\n    .visibleNav ul {\\n        transform: translate(0, 0);\\n        transition: all .2s linear;\\n    }\\n\\n    .small-screen-nav li {\\n        color: #333333;\\n        font-size: 16px;\\n        line-height: 2rem;\\n        background: #FFFFFF;\\n    }\\n\\n    .site-footer {\\n        padding: .42rem 1rem;\\n    }\\n\\n    .site-footer p {\\n        font-size: 14px;\\n    }\\n\\n    .site-footer input {\\n        width: 75vw;\\n        height: 36px;\\n    }\\n\\n    .site-footer button {\\n        line-height: 36px;\\n    }\\n\\n    .site-footer ul {\\n        margin: 0;\\n        flex-wrap: wrap;\\n    }\\n\\n    .site-footer ul li:nth-of-type(1) {\\n        margin: 0 0 10px;\\n    }\\n}\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/assets/index.css?./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/postcss-loader/src");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/components/home/home.css":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/postcss-loader/src!./src/components/home/home.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nvar getUrl = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! ../../assets/images/pageImg.png */ \"./src/assets/images/pageImg.png\"));\n// Module\nexports.push([module.i, \".page_home>div {\\n    position: relative;\\n    display: flex;\\n    align-items: center;\\n    /* justify-content: center; */\\n    box-sizing: content-box;\\n}\\n\\n.page_home>div>img {\\n    position: absolute;\\n}\\n\\n.page_home>div>div {\\n    position: relative;\\n    z-index: 1;\\n}\\n\\n.page_home h1 {\\n    color: #000000;\\n}\\n\\n.page_home h2 {\\n    color: #007AFF;\\n}\\n\\n.system,\\n.cloud-clinic {\\n    background: linear-gradient(180deg, rgba(161, 196, 253, 1) 0%, rgba(194, 233, 251, 1) 100%);\\n}\\n\\n.page_home p {\\n    font-size: 20px;\\n    max-width: 3.41rem;\\n    margin: 20px 0 27px;\\n}\\n\\n.erp p {\\n    margin: 0;\\n}\\n\\n.erp .erp-description {\\n    color: #8E93BC;\\n    font-size: 18px;\\n    margin: .1rem 0 .35rem;\\n}\\n\\n.erp-description::after {\\n    content: '';\\n    display: block;\\n    height: 4px;\\n    width: .64rem;\\n    background: #3CB379;\\n    margin: .2rem 0 0;\\n}\\n\\n.page_home a {\\n    color: #007AFF;\\n    font-size: 20px;\\n}\\n\\n.erp a {\\n    display: inline-block;\\n    padding: .13rem .32rem;\\n    color: #FFFFFF;\\n    background: #007AFF;\\n    border-radius: .06rem;\\n    font-size: 16px;\\n}\\n\\n.erp a:hover {\\n    /*  */\\n    background-color: #2268D5;\\n}\\n\\n.page_home .erp {\\n    position: relative;\\n    padding: 1.08rem 0 .14rem 1.2rem;\\n    justify-content: space-between;\\n    align-items: flex-start;\\n    background: no-repeat center/100% url(\" + ___CSS_LOADER_URL___0___ + \");\\n    box-sizing: content-box;\\n    min-height: 5.69rem;\\n}\\n\\n.page_home .erp>div {\\n    margin: .66rem 0 0;\\n    position: relative;\\n    z-index: 1;\\n}\\n\\n.page_home .instrument {\\n    padding: .6rem 1.3rem .6rem 1.2rem;\\n    min-height: 5rem;\\n    justify-content: flex-end;\\n\\n}\\n\\n.page_home .system {\\n    padding: .6rem 1.2rem .6rem 1.3rem;\\n    min-height: 4.99rem;\\n}\\n\\n.page_home .logistics {\\n    padding: .7rem 2.33rem .76rem 1.53rem;\\n    min-height: 4.74rem;\\n    justify-content: flex-end;\\n}\\n\\n.page_home .cloud-clinic {\\n    padding: .42rem 0;\\n    min-height: 3.39rem;\\n    flex-direction: column;\\n    justify-content: flex-start;\\n}\\n\\n.erp img {\\n    width: 6.63rem;\\n    height: auto;\\n    position: absolute;\\n    right: 0;\\n    top: 1.08rem;\\n    transform: translate(0, 0);\\n    -webkit-animation: upDown 5s linear 1s infinite;\\n            animation: upDown 5s linear 1s infinite;\\n}\\n\\n.instrument img {\\n    top: .6rem;\\n    left: 1.2rem;\\n    width: 7.4rem;\\n    height: 5rem;\\n    /* margin: 0 1.09rem 0 0; */\\n}\\n\\n.system img {\\n    top: .6rem;\\n    right: 1.2rem;\\n    width: 7.44rem;\\n    height: 4.99rem;\\n    margin: 0 0 0 1.05rem;\\n}\\n\\n.logistics img {\\n    top: .7rem;\\n    left: 1.53rem;\\n    width: 5.08rem;\\n    height: 4.74rem;\\n    margin: 0 2.05rem 0 0;\\n}\\n\\n.page_home .cloud-clinic>div {\\n    align-self: stretch;\\n    text-align: center;\\n}\\n\\n.page_home .cloud-clinic p {\\n    max-width: 5.3rem;\\n    margin: .1rem auto .15rem;\\n}\\n\\n.cloud-clinic img {\\n    width: 11.12rem;\\n    height: auto;\\n    margin: .32rem 0 0;\\n}\\n\\n.page_home .cloud-clinic img {\\n    position: relative;\\n}\\n\\n@-webkit-keyframes upDown {\\n    0% {\\n        transform: translate(0, 0)\\n    }\\n\\n    25% {\\n        transform: translate(0, -.3rem)\\n    }\\n\\n    28% {\\n        transform: translate(0, -.3rem)\\n    }\\n\\n    50% {\\n        transform: translate(0, 0)\\n    }\\n\\n    75% {\\n        transform: translate(0, .25rem)\\n    }\\n\\n    80% {\\n        transform: translate(0, .25rem)\\n    }\\n\\n    100% {\\n        transform: translate(0, 0)\\n    }\\n\\n}\\n\\n@keyframes upDown {\\n    0% {\\n        transform: translate(0, 0)\\n    }\\n\\n    25% {\\n        transform: translate(0, -.3rem)\\n    }\\n\\n    28% {\\n        transform: translate(0, -.3rem)\\n    }\\n\\n    50% {\\n        transform: translate(0, 0)\\n    }\\n\\n    75% {\\n        transform: translate(0, .25rem)\\n    }\\n\\n    80% {\\n        transform: translate(0, .25rem)\\n    }\\n\\n    100% {\\n        transform: translate(0, 0)\\n    }\\n\\n}\\n\\n@media (max-width: 768px) {\\n\\n    .page_home a {\\n        font-size: 16px;\\n    }\\n\\n    .page_home p {\\n        font-size: 14px;\\n        margin: 16px 0 20px;\\n        max-width: 188px;\\n    }\\n\\n    .erp .erp-description {\\n        font-size: 12px;\\n    }\\n\\n    .erp a {\\n        /* width: 64px;\\n        line-height: 24px; */\\n        font-size: 12px;\\n        border-radius: 4px;\\n    }\\n\\n    .page_home .erp img {\\n        width: 6rem;\\n        height: auto;\\n        top: auto;\\n        bottom: 1rem;\\n    }\\n\\n    .page_home .erp>div {\\n        margin: .6rem 0 0;\\n        position: relative;\\n        z-index: 1;\\n    }\\n\\n    .page_home>div>img {\\n        top: 50%;\\n        transform: translateY(-50%);\\n    }\\n\\n    .instrument img {\\n        left: .6rem;\\n        width: 5rem;\\n        height: auto;\\n    }\\n\\n    .page_home .instrument {\\n        padding: .6rem .6rem;\\n    }\\n\\n    .system img {\\n        right: .6rem;\\n        width: 6rem;\\n        height: auto;\\n    }\\n\\n    .page_home .system {\\n        padding: .6rem;\\n    }\\n\\n    .logistics img {\\n        left: .6rem;\\n        width: 5rem;\\n        height: auto;\\n    }\\n\\n    .page_home .logistics {\\n        padding: .6rem;\\n    }\\n\\n    .page_home .cloud-clinic {\\n        padding: .6rem;\\n    }\\n\\n    .page_home .cloud-clinic p {\\n        max-width: 100%;\\n    }\\n\\n    .page_home .cloud-clinic img {\\n        transform: translate(0, 0)\\n    }\\n\\n}\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/components/home/home.css?./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/postcss-loader/src");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/subPage/cloud-clinic/style.css":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/postcss-loader/src!./src/subPage/cloud-clinic/style.css ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nvar getUrl = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! ./images/problemImg.png */ \"./src/subPage/cloud-clinic/images/problemImg.png\"));\nvar ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! ./images/ui.png */ \"./src/subPage/cloud-clinic/images/ui.png\"));\nvar ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! ./images/om.png */ \"./src/subPage/cloud-clinic/images/om.png\"));\nvar ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! ./images/bm.png */ \"./src/subPage/cloud-clinic/images/bm.png\"));\nvar ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! ./images/rule.png */ \"./src/subPage/cloud-clinic/images/rule.png\"));\n// Module\nexports.push([module.i, \"\\n.page-title p {\\n    color: #666666;\\n    font-size: 14px;\\n    max-width: 4.5rem;\\n    margin: 20px 0 0;\\n}\\n\\n.page-title div{\\n    display: inline-block;\\n    vertical-align: text-top;\\n}\\n\\n.title-text {\\n    margin: 20px 0.73rem 0 0;\\n}\\n\\n.page-title img {\\n    width: 6.67rem;\\n    height: 2.04rem;\\n}\\n\\n.page-title {\\n    padding: 0.96rem 0 0.50rem 1.3rem;\\n    background: linear-gradient(180deg, rgba(161, 196, 253, 1) 0%, rgba(194, 233, 251, 1) 100%);\\n    /* background-image: url('../home/assets/cloud-clinic.png');\\n    background-size: 6.67rem 2.04rem;\\n    background-repeat: no-repeat;\\n    background-position: 0.96rem 6.53rem; */\\n}\\n\\n.cloud-clinic-problem, .cloud-clinic-solution {\\n    padding: .8rem 0 1rem;\\n    text-align: center;\\n}\\n\\n.cloud-clinic-problem {\\n    background: url(\" + ___CSS_LOADER_URL___0___ + \") no-repeat center;\\n    background-size: 100%;\\n}\\n\\n.cloud-clinic-problem > div {\\n    display: flex;\\n    margin: .6rem 0 0;\\n    padding: 0 1.2rem 0;\\n}\\n\\n.cloud-clinic-problem > div > div {\\n    margin-right: .75rem;\\n}\\n\\n.cloud-clinic-problem > div > div:last-of-type {\\n    margin-right: 0;\\n}\\n\\n.cloud-clinic-problem h6 {\\n    margin: 0 0 20px;\\n    font-weight: 500;\\n}\\n\\n.cloud-clinic-problem p {\\n    line-height: 1.75;\\n}\\n\\n\\n.cloud-clinic-solution {\\n    padding: .8rem 0 1.2rem;\\n}\\n\\n.cloud-clinic-solution > div {\\n    display: flex;\\n    justify-content: center;\\n    margin: 35px 0 0;\\n}\\n\\n.cloud-clinic-solution > div > div {\\n    width: 2.85rem;\\n    height: 2.98rem;\\n    box-shadow:0px 8px 16px 0px rgba(0,0,0,0.1);\\n    margin-right: 20px;\\n    padding: 0 .4rem 0;\\n    box-sizing: border-box;\\n}\\n\\n.lightweight {\\n    background: url(\" + ___CSS_LOADER_URL___1___ + \") no-repeat center .56rem;\\n    background-size: .44rem auto;\\n}\\n\\n.convenient {\\n    background: url(\" + ___CSS_LOADER_URL___2___ + \") no-repeat center .56rem;\\n    background-size: .44rem auto;\\n}\\n\\n.dispatch-free {\\n    background: url(\" + ___CSS_LOADER_URL___3___ + \") no-repeat center .56rem;\\n    background-size: .44rem auto;\\n}\\n\\n.unified-management {\\n    background: url(\" + ___CSS_LOADER_URL___4___ + \") no-repeat center .56rem;\\n    background-size: .44rem auto;\\n}\\n\\n.cloud-clinic-solution > div > div:last-of-type {\\n    margin-right: 0;\\n}\\n\\n.cloud-clinic-solution h6 {\\n    margin: 1.29rem 0 .2rem;\\n}\\n\\n@media (max-width: 768px) {\\n    .page-title {\\n        padding: 0.96rem .6rem 0.50rem;\\n    }\\n\\n    .title-text {\\n        margin: 0 0 20px;\\n    }\\n    .page-title div{\\n        display: block;\\n        text-align: center;\\n    }\\n\\n    .page-title p {\\n        max-width: none;\\n    }\\n\\n    .cloud-clinic-problem {\\n        background: none;\\n    }\\n\\n    .cloud-clinic-problem > div {\\n        flex-wrap: wrap;\\n    }\\n\\n    .cloud-clinic-problem h6 {\\n        margin: 20px 0 10px;\\n    }\\n\\n    .cloud-clinic-solution > div {\\n        flex-wrap: wrap;\\n    }\\n\\n    .cloud-clinic-solution > div > div {\\n        width: 75vw;\\n        height: auto;\\n        margin: 0 0 20px 0;\\n        padding: 0 10px 20px;\\n    }\\n\\n    .lightweight, .convenient, .dispatch-free, .unified-management {\\n        background-size: 20px auto;\\n    }\\n\\n    .cloud-clinic-solution h6 {\\n        margin: 50px 0 10px;\\n    }\\n}\\n\\n\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/subPage/cloud-clinic/style.css?./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/postcss-loader/src");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \"{\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      // eslint-disable-next-line prefer-destructuring\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = modules[_i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = \"(\".concat(item[2], \") and (\").concat(mediaQuery, \")\");\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot).concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (url, needQuotes) {\n  // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n  url = url.__esModule ? url.default : url;\n\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    // eslint-disable-next-line no-param-reassign\n    url = url.slice(1, -1);\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n'), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar stylesInDom = {};\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nfunction listToStyles(list, options) {\n  var styles = [];\n  var newStyles = {};\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var css = item[1];\n    var media = item[2];\n    var sourceMap = item[3];\n    var part = {\n      css: css,\n      media: media,\n      sourceMap: sourceMap\n    };\n\n    if (!newStyles[id]) {\n      styles.push(newStyles[id] = {\n        id: id,\n        parts: [part]\n      });\n    } else {\n      newStyles[id].parts.push(part);\n    }\n  }\n\n  return styles;\n}\n\nfunction addStylesToDom(styles, options) {\n  for (var i = 0; i < styles.length; i++) {\n    var item = styles[i];\n    var domStyle = stylesInDom[item.id];\n    var j = 0;\n\n    if (domStyle) {\n      domStyle.refs++;\n\n      for (; j < domStyle.parts.length; j++) {\n        domStyle.parts[j](item.parts[j]);\n      }\n\n      for (; j < item.parts.length; j++) {\n        domStyle.parts.push(addStyle(item.parts[j], options));\n      }\n    } else {\n      var parts = [];\n\n      for (; j < item.parts.length; j++) {\n        parts.push(addStyle(item.parts[j], options));\n      }\n\n      stylesInDom[item.id] = {\n        id: item.id,\n        refs: 1,\n        parts: parts\n      };\n    }\n  }\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n\n  if (typeof options.attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      options.attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(options.attributes).forEach(function (key) {\n    style.setAttribute(key, options.attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  var styles = listToStyles(list, options);\n  addStylesToDom(styles, options);\n  return function update(newList) {\n    var mayRemove = [];\n\n    for (var i = 0; i < styles.length; i++) {\n      var item = styles[i];\n      var domStyle = stylesInDom[item.id];\n\n      if (domStyle) {\n        domStyle.refs--;\n        mayRemove.push(domStyle);\n      }\n    }\n\n    if (newList) {\n      var newStyles = listToStyles(newList, options);\n      addStylesToDom(newStyles, options);\n    }\n\n    for (var _i = 0; _i < mayRemove.length; _i++) {\n      var _domStyle = mayRemove[_i];\n\n      if (_domStyle.refs === 0) {\n        for (var j = 0; j < _domStyle.parts.length; j++) {\n          _domStyle.parts[j]();\n        }\n\n        delete stylesInDom[_domStyle.id];\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/assets/components/footer.html":
/*!*******************************************!*\
  !*** ./src/assets/components/footer.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"site-footer\\\">\\n    <div>\\n        <div>\\n            <h5>联系我们</h5>\\n            <p>公司地址：上海市静安区江场路1398号园满星空间C301室 </p>\\n            <p>客服电话：021-66691028</p>\\n            <p>客服QQ：2248189065</p>\\n            <p>客服手机：189-2133-6121</p>\\n            <p>工作时间：09:30-18:30（周一至周五）</p>\\n        </div>\\n        <div>\\n            <h5>与我们合作</h5>\\n            <input type=\\\"text\\\" placeholder=\\\"你的姓名\\\">\\n            <input type=\\\"text\\\" placeholder=\\\"你的手机\\\">\\n            <input type=\\\"email\\\" placeholder=\\\"你的邮箱\\\">\\n            <input type=\\\"text\\\" size=\\\"4\\\" placeholder=\\\"给我留言…\\\">\\n            <button>提 交</button>\\n        </div>\\n    </div>\\n    <ul>\\n        <li>Copyright©1692016 Oragee Corp.All Rights Reserved.沪ICP备 08006976-5号 上海查姆信息有限公司</li>\\n        <li><a id=\\\"footer-about-link\\\" href=\\\"./aboutCham.html\\\">关于查姆</a></li>\\n        <li><a href=\\\"javaScript:\\\">友情链接</a></li>\\n        <li><a id=\\\"footer-news-link\\\" href=\\\"./aboutCham.html\\\">查姆动态</a></li>\\n    </ul>\\n</div>\\n\";\n\n//# sourceURL=webpack:///./src/assets/components/footer.html?");

/***/ }),

/***/ "./src/assets/components/header.html":
/*!*******************************************!*\
  !*** ./src/assets/components/header.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = \"<div class=\\\"site-header\\\">\\n    <img src=\\\"\" + __webpack_require__(/*! ../images/logo.png */ \"./src/assets/images/logo.png\") + \"\\\">\\n    <div class=\\\"small-screen-nav\\\">\\n        <img src=\\\"\" + __webpack_require__(/*! ../images/menu.png */ \"./src/assets/images/menu.png\") + \"\\\">\\n        <nav>\\n            <ul>\\n                <li><a id=\\\"home-link\\\" href=\\\"./index.html\\\">首页</a></li>\\n                <!-- <li><a id=\\\"home-link\\\" href=\\\"javascript:\\\">首页</a></li> -->\\n                <!-- <li><a id=\\\"products-link\\\" href=\\\"javascript:\\\">产品中心</a></li> -->\\n                <li><a id=\\\"products-link\\\" href=\\\"./products.html\\\">产品中心</a></li>\\n                <!-- <li><a id=\\\"about-link\\\" href=\\\"javascript:\\\">关于我们</a></li> -->\\n                <li><a id=\\\"about-link\\\" href=\\\"./aboutCham.html\\\">关于我们</a></li>\\n            </ul>\\n        </nav>\\n    </div>\\n    <nav class=\\\"large-screen-nav\\\">\\n        <ul>\\n            <li><a id=\\\"home-link\\\" href=\\\"./index.html\\\">首页</a></li>\\n            <!-- <li><a id=\\\"home-link\\\" href=\\\"javascript:\\\">首页</a></li> -->\\n            <!-- <li><a id=\\\"products-link\\\" href=\\\"javascript:\\\">产品中心</a></li> -->\\n            <li><a id=\\\"products-link\\\" href=\\\"./products.html\\\">产品中心</a></li>\\n            <!-- <li><a id=\\\"about-link\\\" href=\\\"javascript:\\\">关于我们</a></li> -->\\n            <li><a id=\\\"about-link\\\" href=\\\"./aboutCham.html\\\">关于我们</a></li>\\n        </ul>\\n    </nav>\\n</div>\";\n\n//# sourceURL=webpack:///./src/assets/components/header.html?");

/***/ }),

/***/ "./src/assets/images/close.png":
/*!*************************************!*\
  !*** ./src/assets/images/close.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/1f2016f9c7c7fda9bc3bb971dbcf79cd.png\";\n\n//# sourceURL=webpack:///./src/assets/images/close.png?");

/***/ }),

/***/ "./src/assets/images/cloud-clinic.png":
/*!********************************************!*\
  !*** ./src/assets/images/cloud-clinic.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/dd745141b8552f6237384b1c9a322740.png\";\n\n//# sourceURL=webpack:///./src/assets/images/cloud-clinic.png?");

/***/ }),

/***/ "./src/assets/images/logo.png":
/*!************************************!*\
  !*** ./src/assets/images/logo.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/d0874d3d29f28f285b2e22cc897ebfb4.png\";\n\n//# sourceURL=webpack:///./src/assets/images/logo.png?");

/***/ }),

/***/ "./src/assets/images/menu.png":
/*!************************************!*\
  !*** ./src/assets/images/menu.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/a38ed85954027e2eb8c671f16db886d0.png\";\n\n//# sourceURL=webpack:///./src/assets/images/menu.png?");

/***/ }),

/***/ "./src/assets/images/pageImg.png":
/*!***************************************!*\
  !*** ./src/assets/images/pageImg.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/4e36abc238e95f675cb38639f3e1c832.png\";\n\n//# sourceURL=webpack:///./src/assets/images/pageImg.png?");

/***/ }),

/***/ "./src/assets/index.css":
/*!******************************!*\
  !*** ./src/assets/index.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../node_modules/postcss-loader/src!./index.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/assets/index.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../node_modules/postcss-loader/src!./index.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/assets/index.css\",\n      function () {\n        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../node_modules/postcss-loader/src!./index.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/assets/index.css\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./src/assets/index.css?");

/***/ }),

/***/ "./src/assets/js/common/index.js":
/*!***************************************!*\
  !*** ./src/assets/js/common/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/header */ \"./src/assets/js/common/view/header.js\");\n/* harmony import */ var _view_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/footer */ \"./src/assets/js/common/view/footer.js\");\n/* harmony import */ var _images_menu_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/menu.png */ \"./src/assets/images/menu.png\");\n/* harmony import */ var _images_menu_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_menu_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _images_close_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/close.png */ \"./src/assets/images/close.png\");\n/* harmony import */ var _images_close_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_close_png__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _ieConfig_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ieConfig/index */ \"./src/assets/js/ieConfig/index.js\");\n\n\n\n\n\n\n\n\n// 显示菜单\nfunction showMenu() {\n    const img = document.querySelector('.small-screen-nav img')\n    img.src = _images_close_png__WEBPACK_IMPORTED_MODULE_3___default.a\n    \n    _ieConfig_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"].addClass(document.querySelector('.small-screen-nav nav'), 'visibleNav')\n    // document.querySelector('.small-screen-nav nav').classList.add('visibleNav')\n\n    // className\n    img.removeEventListener('click', showMenu)\n    img.addEventListener('click', hideMenu)\n}\n\n// 收起菜单\nfunction hideMenu() {\n    const img = document.querySelector('.small-screen-nav img')\n    img.src = _images_menu_png__WEBPACK_IMPORTED_MODULE_2___default.a\n    _ieConfig_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"].removeClass(document.querySelector('.small-screen-nav nav'), 'visibleNav')\n    // document.querySelector('.small-screen-nav nav').classList.remove('visibleNav')\n\n    img.removeEventListener('click', hideMenu)\n    img.addEventListener('click', showMenu)\n}\n// 写入页面header和footer\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n    // 页面内容\n    let Header = document.getElementsByTagName('header')[0],\n        Footer = document.getElementsByTagName('footer')[0]\n\n    new _view_header__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().mount(Header)\n    new _view_footer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().mount(Footer)\n\n    document.querySelector('.site-header img').onclick = () => {\n        location.pathname = '/index.html'\n    }\n\n    // 手机端的收起菜单按钮\n    // if (document.querySelector('.small-screen-nav img')) document.querySelector('.small-screen-nav img').onclick = () => { \n    //     document.querySelector('.small-screen-nav nav').classList.add('visibleNav')\n    // }\n\n\n    const img = document.querySelector('.small-screen-nav img')\n    if (img && img.addEventListener) img.addEventListener('click', showMenu) \n    else {\n        // IE \n    }\n});\n\n//# sourceURL=webpack:///./src/assets/js/common/index.js?");

/***/ }),

/***/ "./src/assets/js/common/view/footer.js":
/*!*********************************************!*\
  !*** ./src/assets/js/common/view/footer.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_footer_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/footer.html */ \"./src/assets/components/footer.html\");\n/* harmony import */ var _components_footer_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_footer_html__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\n    mount(container) {\n        container.innerHTML = _components_footer_html__WEBPACK_IMPORTED_MODULE_0___default.a\n    }\n});\n\n//# sourceURL=webpack:///./src/assets/js/common/view/footer.js?");

/***/ }),

/***/ "./src/assets/js/common/view/header.js":
/*!*********************************************!*\
  !*** ./src/assets/js/common/view/header.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_header_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/header.html */ \"./src/assets/components/header.html\");\n/* harmony import */ var _components_header_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_header_html__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\n    mount(container) {\n        container.innerHTML = _components_header_html__WEBPACK_IMPORTED_MODULE_0___default.a\n    }\n});\n\n//# sourceURL=webpack:///./src/assets/js/common/view/header.js?");

/***/ }),

/***/ "./src/assets/js/ieConfig/index.js":
/*!*****************************************!*\
  !*** ./src/assets/js/ieConfig/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// 添加类名\nfunction addClass(element, className) {\n    if (!element || !className) return\n    if (element.classList) element.classList.add(className)\n    else if (element.className === className) return\n    else element.className = className\n}\n\nfunction removeClass(element, className) {\n    if (!element || !className) return\n    if (element.classList) element.classList.remove(className)\n    else if (element.className === className) element.classList = ''\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    addClass: addClass,\n    removeClass: removeClass\n});\n\n//# sourceURL=webpack:///./src/assets/js/ieConfig/index.js?");

/***/ }),

/***/ "./src/components/home/assets/cloud-clinic.png":
/*!*****************************************************!*\
  !*** ./src/components/home/assets/cloud-clinic.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/dd745141b8552f6237384b1c9a322740.png\";\n\n//# sourceURL=webpack:///./src/components/home/assets/cloud-clinic.png?");

/***/ }),

/***/ "./src/components/home/assets/erp.png":
/*!********************************************!*\
  !*** ./src/components/home/assets/erp.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/8ae48d2f205b7365e1feb4b3cfcd01f5.png\";\n\n//# sourceURL=webpack:///./src/components/home/assets/erp.png?");

/***/ }),

/***/ "./src/components/home/assets/instrument.png":
/*!***************************************************!*\
  !*** ./src/components/home/assets/instrument.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/40f91733a6655c55e078b942db8d8720.png\";\n\n//# sourceURL=webpack:///./src/components/home/assets/instrument.png?");

/***/ }),

/***/ "./src/components/home/assets/logistics.png":
/*!**************************************************!*\
  !*** ./src/components/home/assets/logistics.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/24ac3a513cfac740589d1ef54d9a9d87.png\";\n\n//# sourceURL=webpack:///./src/components/home/assets/logistics.png?");

/***/ }),

/***/ "./src/components/home/assets/system.png":
/*!***********************************************!*\
  !*** ./src/components/home/assets/system.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/bcd338331a259768fcf2dcfdf5f6ce00.png\";\n\n//# sourceURL=webpack:///./src/components/home/assets/system.png?");

/***/ }),

/***/ "./src/components/home/home.css":
/*!**************************************!*\
  !*** ./src/components/home/home.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../../node_modules/postcss-loader/src!./home.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/components/home/home.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../../node_modules/postcss-loader/src!./home.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/components/home/home.css\",\n      function () {\n        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../../node_modules/postcss-loader/src!./home.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/components/home/home.css\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./src/components/home/home.css?");

/***/ }),

/***/ "./src/components/home/home.html":
/*!***************************************!*\
  !*** ./src/components/home/home.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = \"<!-- 首页 -->\\n<div class=\\\"page_home\\\">\\n    <div class=\\\"erp\\\">\\n        <div>\\n            <h2>医疗管理ERP</h2>\\n            <p class=\\\"erp-description\\\">符合药监系统的一体化ERP系统，涵盖企业进、销、存的管理，其报表分析系统亦能助力企业决策</p>\\n            <p>\\n                <!-- <a id='erp_link' href=\\\"javascript:\\\">了解更多</a> -->\\n                <p><a id='logistics_link' href=\\\"./products.html?product=instruments\\\">了解更多</a></p>\\n            </p>\\n        </div>\\n        <img src=\\\"\" + __webpack_require__(/*! ./assets/erp.png */ \"./src/components/home/assets/erp.png\") + \"\\\">\\n    </div>\\n    <div class=\\\"instrument\\\">\\n        <img src=\\\"\" + __webpack_require__(/*! ./assets/instrument.png */ \"./src/components/home/assets/instrument.png\") + \"\\\">\\n        <div>\\n            <h1>医疗器械版</h1>\\n            <p>符合新版GSP管理、软件操作简单、一键式安装、支持异地远程服务、数据安全稳定。</p>\\n            <!-- <p><a id='instruments_link' href=\\\"javascript:\\\">了解更多</a></p> -->\\n            <p><a id='logistics_link' href=\\\"./products.html?product=instruments\\\">了解更多</a></p>\\n        </div>\\n    </div>\\n    <div class=\\\"system\\\">\\n        <div>\\n            <h1>仓储系统</h1>\\n            <p>实现无纸化作业、加快拣货速度、提高拣货的准确率、降低培训成本、可追溯性和记录工作量。</p>\\n            <!-- <p><a id='warehousing-system_link' href=\\\"javascript:\\\">了解更多</a></p> -->\\n            <p><a id='logistics_link' href=\\\"./products.html?product=warehousing-system\\\">了解更多</a></p>\\n        </div>\\n        <img src=\\\"\" + __webpack_require__(/*! ./assets/system.png */ \"./src/components/home/assets/system.png\") + \"\\\">\\n    </div>\\n    <div class=\\\"logistics\\\">\\n        <img src=\\\"\" + __webpack_require__(/*! ./assets/logistics.png */ \"./src/components/home/assets/logistics.png\") + \"\\\">\\n        <div>\\n            <h1>第三方物流</h1>\\n            <p>通过系统对接的方式，保证多平台订单数据、结算数据的一致性，且系统涵盖完整的WMS系统，从收货入库到拣选出库的流程一应俱全。</p>\\n            <!-- <p><a id='logistics_link' href=\\\"javascript:\\\">了解更多</a></p> -->\\n            <p><a id='logistics_link' href=\\\"./products.html?product=logistics\\\">了解更多</a></p>\\n        </div>\\n    </div>\\n    <div class=\\\"cloud-clinic\\\">\\n        <div>\\n            <h1>云诊所</h1>\\n            <p>内外兼修的SaaS系统，提供多种诊所内部管理模块，外部客户使用的多种功能，包罗全部业务所需。</p>\\n            <p><a id='cloud-clinic_link' href=\\\"javascript:\\\">了解更多</a></p>\\n            <!-- <p><a id='cloud-clinic_link' href=\\\"javascript:\\\">了解更多</a></p> -->\\n        </div>\\n        <img src=\\\"\" + __webpack_require__(/*! ./assets/cloud-clinic.png */ \"./src/components/home/assets/cloud-clinic.png\") + \"\\\">\\n    </div>\\n</div>\";\n\n//# sourceURL=webpack:///./src/components/home/home.html?");

/***/ }),

/***/ "./src/components/home/home.js":
/*!*************************************!*\
  !*** ./src/components/home/home.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.html */ \"./src/components/home/home.html\");\n/* harmony import */ var _home_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _home_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.css */ \"./src/components/home/home.css\");\n/* harmony import */ var _home_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _subPage_cloud_clinic_cloud_clinic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../subPage/cloud-clinic/cloud-clinic */ \"./src/subPage/cloud-clinic/cloud-clinic.js\");\n/* harmony import */ var _router_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../router/index */ \"./src/router/index.js\");\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\n    mount(container) {\n        container.innerHTML = _home_html__WEBPACK_IMPORTED_MODULE_0___default.a\n\n        document.getElementById('cloud-clinic_link').addEventListener('click', (event) => {\n            window.scrollTo(0, 0)\n            _router_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"].skip('cloud-clinic')\n            // router.go('/cloud-clinic')\n        })\n    }\n});\n\n//# sourceURL=webpack:///./src/components/home/home.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/index.css */ \"./src/assets/index.css\");\n/* harmony import */ var _assets_index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_index_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_js_common_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/js/common/index */ \"./src/assets/js/common/index.js\");\n/* harmony import */ var _components_home_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/home/home */ \"./src/components/home/home.js\");\n\n// import router from './router/index'\n\n\n\n\n// import header from './assets/components/header.html'\n// import footer from './assets/components/footer.html'\n\n// let Header = document.getElementsByTagName('header')[0],\n//     Footer = document.getElementsByTagName('footer')[0]\n\n// Header.innerHTML = header\n// Footer.innerHTML = footer\n\n// 载入页面只要内容\n// router.start()\nObject(_assets_js_common_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\nnew _components_home_home__WEBPACK_IMPORTED_MODULE_2__[\"default\"]().mount(document.getElementById('site-page-content'))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _routes_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/routes */ \"./src/router/routes/routes.js\");\n\n\nclass Router {\n    start() {\n        window.addEventListener('popstate', this.back)\n\n        // 本地文件\n        // if (/file/.test(location.href)) this.load('/')\n        // else this.load(location.pathname)\n\n    }\n\n    // erp\n\n    go(path, params) {\n        if (path === '/erp') path += `${params? '?product=' + params: ''}`\n        else if (params) path += `?title=${params}`\n\n        try {\n            history.pushState({}, '', path)\n            this.load(path, params)\n        } catch (error) {\n            // console.error()\n            // 在本地打开项目文件\n            this.load(path, params)\n        }\n    }\n\n    // 打开本地文件时如何载入\n    load(path) {\n        console.log(path)\n        // if (path === '/') {\n        if (/\\/$/.test(path)) {\n            const view = new(Object(_routes_routes__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('/home'))()\n            view.mount(document.getElementById('site-page-content'))\n        }\n        // else if (/title/.test(path)) path = '/about/news'\n        // console.log(path.replace(/\\?.*$/, ''))\n        // const view = new routes[path.replace(/\\?.*$/, '')]()\n        else Object(_routes_routes__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(path.replace(/\\?.*$/, '')).then(module => {\n            const view = new module.default()\n            view.mount(document.getElementById('site-page-content'))\n        })\n    }\n\n    back() {\n        // 根据location.pathname\n        window.location.reload()\n        window.removeEventListener('popstate', this.back)\n    }\n\n    skip(path, param) {\n        // #path?title\n        // #path\n        try {\n            history.pushState({}, '', `#${path}${param ? '?' + param : ''}`)\n            Object(_routes_routes__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(path).then(module => {\n                const view = new module.default()\n                view.mount(document.getElementById('site-page-content'))\n            })\n        } catch (error) {\n            Object(_routes_routes__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(path).then(module => {\n                const view = new module.default()\n                view.mount(document.getElementById('site-page-content'))\n            })\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new Router());\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/router/routes/routes.js":
/*!*************************************!*\
  !*** ./src/router/routes/routes.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((path) => {\n    switch (path) {\n        case 'cloud-clinic':\n            return __webpack_require__.e(/*! import() | cloud-clinic */ \"cloud-clinic\").then(__webpack_require__.bind(null, /*! ../../subPage/cloud-clinic/cloud-clinic */ \"./src/subPage/cloud-clinic/cloud-clinic.js\"))\n        case 'news':\n            return __webpack_require__.e(/*! import() | news */ \"news\").then(__webpack_require__.bind(null, /*! ../../subPage/news/news */ \"./src/subPage/news/news.js\"))\n        default:\n            break;\n    }\n});\n\n\n//# sourceURL=webpack:///./src/router/routes/routes.js?");

/***/ }),

/***/ "./src/subPage/cloud-clinic/cloud-clinic.html":
/*!****************************************************!*\
  !*** ./src/subPage/cloud-clinic/cloud-clinic.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = \"<div class=\\\"page_cloud-clinic\\\">\\n    <div class=\\\"page-title\\\">\\n        <div class=\\\"title-text\\\">\\n            <h2>云诊所</h2>\\n            <p>内外兼修的轻量级系统，提供包括公司体系及基础信息管理，内部CRM、ERP、财务薪酬、排班、内部培训，在线商城、IM、预约、公众号及回访中心等外部客户功能，包罗您的全部业务所需。</p>\\n        </div>\\n        <div>\\n            <img src=\\\"\" + __webpack_require__(/*! ../../assets/images/cloud-clinic.png */ \"./src/assets/images/cloud-clinic.png\") + \"\\\">\\n        </div>\\n    </div>\\n    <div class=\\\"cloud-clinic-problem\\\">\\n        <h3>是否遇见以下问题</h3>\\n        <div>\\n            <div>\\n                <h6>系统繁多，无法统一管理的问题</h6>\\n                <p>同一个公司有多套系统，分别管理不同流程、部门、分支，无法统一标准，统一管理，使得企业内部管理混乱。</p>\\n            </div>\\n            <div>\\n                <h6>系统复杂，不易操作的麻烦</h6>\\n                <p>系统功能繁多，角色权限不清晰；操作复杂，交互不友好，磨合期较长，不能及时有效的真正解决企业问题。</p>\\n            </div>\\n            <div>\\n                <h6>高额的系统培训成本</h6>\\n                <p>传统系统无操作手册可查，系统配置复杂，各层培训时间长，成本高，人力浪费严重，企业无法有效协同及管理。</p>\\n            </div>\\n        </div>\\n    </div>\\n    <div class=\\\"cloud-clinic-solution\\\">\\n        <h3>我们为您解决</h3>\\n        <div>\\n            <div class=\\\"lightweight\\\">\\n                <h6>轻量级</h6>\\n                <p>非庞大的系统，对于新建企业友好度较高，只需操作手册，免去各类培训成本。</p>\\n            </div>\\n            <div class=\\\"convenient\\\">\\n                <h6>一站式</h6>\\n                <p>包含CRM、ERP、IM、WMS、OMS等一系列的功能，一站式囊获多个系统内容。</p>\\n            </div>\\n            <div class=\\\"dispatch-free\\\">\\n                <h6>免部署</h6>\\n                <p>SaaS架构，免除系统部署及后续运维的人员配备，及相关服务器的成本费用。</p>\\n            </div>\\n            <div class=\\\"unified-management\\\">\\n                <h6>兼顾内外</h6>\\n                <p>对内管理及对客户使用集成为同一套系统，免去了系统来回导入产生错漏的可能。</p>\\n            </div>\\n        </div>\\n    </div>\\n</div>\";\n\n//# sourceURL=webpack:///./src/subPage/cloud-clinic/cloud-clinic.html?");

/***/ }),

/***/ "./src/subPage/cloud-clinic/cloud-clinic.js":
/*!**************************************************!*\
  !*** ./src/subPage/cloud-clinic/cloud-clinic.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cloud_clinic_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cloud-clinic.html */ \"./src/subPage/cloud-clinic/cloud-clinic.html\");\n/* harmony import */ var _cloud_clinic_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cloud_clinic_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _router_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../router/index */ \"./src/router/index.js\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ \"./src/subPage/cloud-clinic/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\n    mount(container) {\n        container.innerHTML = _cloud_clinic_html__WEBPACK_IMPORTED_MODULE_0___default.a\n        _router_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"].start()\n    }\n});\n\n//# sourceURL=webpack:///./src/subPage/cloud-clinic/cloud-clinic.js?");

/***/ }),

/***/ "./src/subPage/cloud-clinic/images/bm.png":
/*!************************************************!*\
  !*** ./src/subPage/cloud-clinic/images/bm.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/4f8b3fbad5523391e8cdf2736ac48d44.png\";\n\n//# sourceURL=webpack:///./src/subPage/cloud-clinic/images/bm.png?");

/***/ }),

/***/ "./src/subPage/cloud-clinic/images/om.png":
/*!************************************************!*\
  !*** ./src/subPage/cloud-clinic/images/om.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/557fe8fd1c742b161b93561e6cedd128.png\";\n\n//# sourceURL=webpack:///./src/subPage/cloud-clinic/images/om.png?");

/***/ }),

/***/ "./src/subPage/cloud-clinic/images/problemImg.png":
/*!********************************************************!*\
  !*** ./src/subPage/cloud-clinic/images/problemImg.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/45f97fe8a86cedfe438ecd404cc7184e.png\";\n\n//# sourceURL=webpack:///./src/subPage/cloud-clinic/images/problemImg.png?");

/***/ }),

/***/ "./src/subPage/cloud-clinic/images/rule.png":
/*!**************************************************!*\
  !*** ./src/subPage/cloud-clinic/images/rule.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/08a80dd0d5a67308cd2d898f72ec1616.png\";\n\n//# sourceURL=webpack:///./src/subPage/cloud-clinic/images/rule.png?");

/***/ }),

/***/ "./src/subPage/cloud-clinic/images/ui.png":
/*!************************************************!*\
  !*** ./src/subPage/cloud-clinic/images/ui.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/094959ac19bf5826d3b7029fe9d4d7ba.png\";\n\n//# sourceURL=webpack:///./src/subPage/cloud-clinic/images/ui.png?");

/***/ }),

/***/ "./src/subPage/cloud-clinic/style.css":
/*!********************************************!*\
  !*** ./src/subPage/cloud-clinic/style.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../../node_modules/postcss-loader/src!./style.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/subPage/cloud-clinic/style.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../../node_modules/postcss-loader/src!./style.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/subPage/cloud-clinic/style.css\",\n      function () {\n        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../../node_modules/postcss-loader/src!./style.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/subPage/cloud-clinic/style.css\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./src/subPage/cloud-clinic/style.css?");

/***/ })

/******/ });