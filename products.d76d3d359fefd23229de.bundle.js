/******/ (function(modules) { // webpackBootstrap
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
/******/ 	var hotCurrentHash = "d76d3d359fefd23229de";
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
/******/ 			var chunkId = "products";
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/products/index.js")(__webpack_require__.s = "./src/products/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/assets/index.css":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/src!./src/assets/index.css ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nvar getUrl = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! ../assets/images/logo.png */ \"./src/assets/images/logo.png\"));\n// Module\nexports.push([module.i, \"body,\\np,\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6,\\nul,\\nli,\\ninput {\\n    padding: 0;\\n    margin: 0;\\n    color: #333333;\\n    font-weight: normal;\\n    box-sizing: border-box;\\n}\\n\\nh1 {\\n    font-size: 48px;\\n}\\n\\nh2 {\\n    font-size: 36px;\\n}\\n\\nh3 {\\n    font-size: 32px;\\n    font-weight: 500;\\n}\\n\\nh5 {\\n    font-weight: 400;\\n    font-size: 20px;\\n    color: #FFFFFF;\\n}\\n\\np {\\n    font-size: 14px;\\n    color: #666666;\\n}\\n\\nh6 {\\n    font-size: 18px;\\n}\\n\\na {\\n    color: inherit;\\n    text-decoration: none;\\n}\\n\\nul {\\n    list-style: none;\\n    display: flex;\\n}\\n\\ninput {\\n    background-color: transparent;\\n    border: 1px solid #DDE1E3;\\n    padding: 0 16px;\\n    color: #FFFFFF;\\n    font-size: 14px;\\n}\\n\\ninput::-webkit-input-placeholder {\\n    color: #7A8C94;\\n    font-size: 14px;\\n}\\n\\ninput::-moz-placeholder {\\n    color: #7A8C94;\\n    font-size: 14px;\\n}\\n\\ninput:-ms-input-placeholder {\\n    color: #7A8C94;\\n    font-size: 14px;\\n}\\n\\ninput::-ms-input-placeholder {\\n    color: #7A8C94;\\n    font-size: 14px;\\n}\\n\\ninput::placeholder {\\n    color: #7A8C94;\\n    font-size: 14px;\\n}\\n\\n:focus {\\n    outline: none;\\n}\\n\\nbutton {\\n    background-color: transparent;\\n    border: 1px solid #EBEDEF;\\n    color: #FFFFFF;\\n    font-size: 14px;\\n}\\n\\nbutton:active,\\nbutton:hover {\\n    background-color: rgba(255, 255, 255, .1);\\n}\\n\\n/* 1vw = 14.4px */\\n/* 7vw = 100.8px = 1rem */\\n/* 约等于 1rem = 100px */\\nhtml {\\n    font-size: 7vw;\\n    width: 100vw;\\n}\\n\\n.site-header {\\n    display: flex;\\n    align-items: center;\\n    justify-content: space-between;\\n    padding: 0 1.17rem 0 1.21rem;\\n}\\n\\n.site-header > a {\\n    display: block;\\n    width: 1.26rem;\\n    align-self: stretch;\\n    background: url(\" + ___CSS_LOADER_URL___0___ + \") no-repeat center;\\n    background-size: 100% auto;\\n}\\n\\n.large-screen-nav li {\\n    line-height: .66rem;\\n    height: .66rem;\\n    width: 114px;\\n    color: #666666;\\n    font-size: 16px;\\n    text-align: center;\\n    box-sizing: border-box;\\n}\\n\\n.large-screen-nav li:hover{\\n    border-bottom: 2px solid #007AFF;\\n    color: #007AFF;\\n}\\n\\n.small-screen-nav {\\n    display: none;\\n}\\n\\n.site-header a {\\n    color: inherit;\\n}\\n\\n.site-footer {\\n    background: #014A6D;\\n    padding: .42rem 2rem 0;\\n}\\n\\n.site-footer p {\\n    font-size: 16px;\\n    color: #EBEDEF;\\n    margin: .28rem 0;\\n    font-weight: 300;\\n}\\n\\n.site-footer>div {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: flex-start;\\n    flex-wrap: wrap;\\n}\\n\\n.site-footer input {\\n    display: block;\\n    width: 4.80rem;\\n    height: 48px;\\n    margin: .24rem 0;\\n}\\n\\n.site-footer button {\\n    display: block;\\n    width: 2.4rem;\\n    line-height: 48px;\\n    font-size: 14px;\\n    margin: .24rem 0 .42rem;\\n}\\n\\n.site-footer button:hover {\\n    cursor: pointer;\\n}\\n\\n\\n.site-footer ul {\\n    display: flex;\\n    font-size: 14px;\\n    color: #FFFFFF;\\n    margin: 0 -80px 0;\\n    line-height: .76rem;\\n}\\n\\n.site-footer li {\\n    color: #FFFFFF;\\n    margin-right: 30px;\\n}\\n\\n.site-footer ul li:nth-of-type(1) {\\n    flex-grow: 1;\\n}\\n\\n.site-footer li:last-of-type {\\n    margin-right: 0;\\n}\\n\\n@media (max-width: 768px) {\\n    h1 {\\n        font-size: 24px;\\n    }\\n\\n    h2 {\\n        font-size: 20px;\\n    }\\n\\n    h3 {\\n        font-size: 18px;\\n    }\\n\\n    h5 {\\n        font-size: 16px;\\n    }\\n\\n    h6 {\\n        font-size: 14px;\\n    }\\n\\n    p {\\n        font-size: 12px;\\n    }\\n\\n    header {\\n        height: 2.4rem;\\n    }\\n\\n    .site-header {\\n        padding: 0 .6rem;\\n        height: 2.4rem;\\n        position: fixed;\\n        top: 0;\\n        left: 0;\\n        right: 0;\\n        z-index: 3;\\n        background: #FFFFFF;\\n        box-sizing: border-box;\\n    }\\n\\n    .site-header > a {\\n        width: 100px;\\n    }\\n\\n    .large-screen-nav {\\n        display: none;\\n    }\\n\\n    .small-screen-nav {\\n        display: block;\\n    }\\n\\n    .small-screen-nav img {\\n        width: .76rem;\\n        height: auto;\\n    }\\n\\n    .small-screen-nav nav {\\n        position: absolute;\\n        overflow: hidden;\\n        width: 100vw;\\n        top: 2.4rem;\\n        height: 0;\\n        left: 0;\\n    }\\n\\n    .small-screen-nav .visibleNav {\\n        height: 100vh;\\n        background: rgba(0, 0, 0, .4);\\n        border-top: 1px solid #f8f9f9;\\n    }\\n\\n    .small-screen-nav ul {\\n        display: block;\\n        text-align: center;\\n        transform: translate(-100px, 0);\\n    }\\n\\n    .visibleNav ul {\\n        transform: translate(0, 0);\\n        transition: all .2s linear;\\n    }\\n\\n    .small-screen-nav li {\\n        color: #333333;\\n        font-size: 16px;\\n        line-height: 2rem;\\n        background: #FFFFFF;\\n    }\\n\\n    .site-footer {\\n        padding: .42rem 1rem;\\n    }\\n\\n    .site-footer p {\\n        font-size: 14px;\\n    }\\n\\n    .site-footer input {\\n        width: 75vw;\\n        height: 36px;\\n    }\\n\\n    .site-footer button {\\n        line-height: 36px;\\n    }\\n\\n    .site-footer ul {\\n        margin: 0;\\n        flex-wrap: wrap;\\n    }\\n\\n    .site-footer ul li:nth-of-type(1) {\\n        margin: 0 0 10px;\\n    }\\n}\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/assets/index.css?./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/src");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/products/assets/index.css":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/src!./src/products/assets/index.css ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nvar getUrl = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! ../../assets/images/problemImg.png */ \"./src/assets/images/problemImg.png\"));\nvar ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! ../assets/imgs/gpsImg.png */ \"./src/products/assets/imgs/gpsImg.png\"));\nvar ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! ../assets/imgs/slImg.png */ \"./src/products/assets/imgs/slImg.png\"));\nvar ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! ../assets/imgs/scImg.png */ \"./src/products/assets/imgs/scImg.png\"));\nvar ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! ../assets/imgs/amImg.png */ \"./src/products/assets/imgs/amImg.png\"));\nvar ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! ../assets/imgs/saImg.png */ \"./src/products/assets/imgs/saImg.png\"));\nvar ___CSS_LOADER_URL___6___ = getUrl(__webpack_require__(/*! ../assets/imgs/ccImg.png */ \"./src/products/assets/imgs/ccImg.png\"));\nvar ___CSS_LOADER_URL___7___ = getUrl(__webpack_require__(/*! ../assets/imgs/tsImg.png */ \"./src/products/assets/imgs/tsImg.png\"));\nvar ___CSS_LOADER_URL___8___ = getUrl(__webpack_require__(/*! ../assets/imgs/cmImg.png */ \"./src/products/assets/imgs/cmImg.png\"));\nvar ___CSS_LOADER_URL___9___ = getUrl(__webpack_require__(/*! ../assets/imgs/pmImg.png */ \"./src/products/assets/imgs/pmImg.png\"));\nvar ___CSS_LOADER_URL___10___ = getUrl(__webpack_require__(/*! ../assets/imgs/gmImg.png */ \"./src/products/assets/imgs/gmImg.png\"));\nvar ___CSS_LOADER_URL___11___ = getUrl(__webpack_require__(/*! ../assets/imgs/msImg.png */ \"./src/products/assets/imgs/msImg.png\"));\nvar ___CSS_LOADER_URL___12___ = getUrl(__webpack_require__(/*! ../assets/imgs/bcmImg.png */ \"./src/products/assets/imgs/bcmImg.png\"));\nvar ___CSS_LOADER_URL___13___ = getUrl(__webpack_require__(/*! ../assets/imgs/poImg.png */ \"./src/products/assets/imgs/poImg.png\"));\nvar ___CSS_LOADER_URL___14___ = getUrl(__webpack_require__(/*! ../assets/imgs/ewImg.png */ \"./src/products/assets/imgs/ewImg.png\"));\nvar ___CSS_LOADER_URL___15___ = getUrl(__webpack_require__(/*! ../assets/imgs/psImg.png */ \"./src/products/assets/imgs/psImg.png\"));\nvar ___CSS_LOADER_URL___16___ = getUrl(__webpack_require__(/*! ../assets/imgs/groupingImg.png */ \"./src/products/assets/imgs/groupingImg.png\"));\n// Module\nexports.push([module.i, \".enterprise-system_title {\\n    position: relative;\\n    padding: 1.15rem 1.3rem;\\n    box-sizing: content-box;\\n    background: -webkit-linear-gradient(top, #A1C4FD, #C2E9FB);\\n}\\n\\n.photo {\\n    position: absolute;\\n    width: 2.81rem;\\n    height: auto;\\n    left: 11.16rem;\\n    top: .55rem;\\n    z-index: 3;\\n}\\n\\n.enterprise-system_title>h2 {\\n    margin: 0 0 .2rem;\\n}\\n\\n.enterprise-system_title>p {\\n    max-width: 5.18rem;\\n    line-height: 1.8;\\n}\\n\\n.page_enterprise-system>ul {\\n    display: flex;\\n    justify-content: center;\\n}\\n\\n.page_enterprise-system li {\\n    width: 2.4rem;\\n    line-height: .64rem;\\n    color: #333333;\\n    font-size: 16px;\\n    text-align: center;\\n    position: relative;\\n}\\n\\n.page_enterprise-system .activeTab {\\n    color: #007AFF;\\n}\\n\\n.page_enterprise-system .activeTab::after {\\n    content: '';\\n    display: block;\\n    width: 100%;\\n    height: 3px;\\n    background: #007AFF;\\n    position: absolute;\\n    bottom: 0;\\n}\\n\\n.page_enterprise-system .activeTab a {\\n    color: #007AFF;\\n}\\n\\n.page_enterprise-system a {\\n    color: inherit;\\n}\\n\\n.instryments-problem {\\n    box-sizing: border-box;\\n    padding: .8rem 0 0;\\n    text-align: center;\\n    background: url(\" + ___CSS_LOADER_URL___0___ + \") no-repeat center/100%;\\n}\\n\\n.instryments-solution>h6 {\\n    /* font-size: 18px;\\n    color: #333333; */\\n    margin: 20px 0 52px;\\n}\\n\\n.instryments-problem>div,\\n.instryments-solution {\\n    text-align: center;\\n}\\n\\n.instryments-problem>div {\\n    display: flex;\\n    flex-wrap: wrap;\\n    align-items: center;\\n    justify-content: center;\\n}\\n\\n.instryments-problem>div>div {\\n    display: inline-flex;\\n    /* vertical-align: middle; */\\n    margin: .64rem .65rem .55rem 0;\\n    padding: 0 .5rem;\\n    font-size: 18px;\\n    color: #666666;\\n    width: 3.6rem;\\n    height: 1.28rem;\\n    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);\\n    background: #F8F8FA;\\n    justify-content: center;\\n    align-items: center;\\n    box-sizing: border-box;\\n}\\n\\n.instryments-problem>div>div:last-of-type {\\n    margin-right: 0;\\n}\\n\\n.instryments-solution {\\n    padding: .8rem .6rem .7rem;\\n}\\n\\n.instryments-solution>div {\\n    display: flex;\\n    flex-wrap: wrap;\\n    padding: 0 .6rem;\\n    justify-content: space-between;\\n}\\n\\n.instryments-solution>div>div {\\n    width: 5.4rem;\\n    text-align: left;\\n    margin: 0 0 .6rem 0;\\n    max-height: .7rem;\\n    padding: 0 0 0 .62rem;\\n    box-sizing: border-box;\\n    position: relative;\\n}\\n\\n.instryments-solution>div>div::before {\\n    content: '';\\n    position: absolute;\\n    left: 0;\\n    width: .42rem;\\n    min-width: 20px;\\n    height: 100%;\\n    background-repeat: no-repeat;\\n    background-position: left top;\\n    background-size: 100% auto;\\n}\\n\\n.instryments-solution p {\\n    color: #666666;\\n    margin: .1rem 0 0;\\n    line-height: 1.8;\\n}\\n\\n.gps::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___1___ + \");\\n}\\n\\n.shopping-list::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___2___ + \");\\n}\\n\\n.settlement-control::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___3___ + \");\\n}\\n\\n.authority-management::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___4___ + \");\\n}\\n\\n.strategic-analysis::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___5___ + \");\\n}\\n\\n.channel-control::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___6___ + \");\\n}\\n\\n.traceability-system::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___7___ + \");\\n}\\n\\n.credit-control::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___8___ + \");\\n}\\n\\n.promotion-management::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___9___ + \");\\n}\\n\\n.product-management::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___10___ + \");\\n}\\n\\n.multi-service::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___11___ + \");\\n}\\n\\n.bar-code-management::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___12___ + \");\\n}\\n\\n.process-oriented::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___13___ + \");\\n}\\n\\n.early-warning::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___14___ + \");\\n}\\n\\n.price-system::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___15___ + \")\\n}\\n\\n.grouping::before {\\n    background-image: url(\" + ___CSS_LOADER_URL___16___ + \");\\n}\\n\\n.instryments-problem > .easing-currence {\\n    opacity: 1;\\n    transform: translate(0, 0);\\n    -webkit-animation: easing .5s linear;\\n            animation: easing .5s linear;\\n}\\n\\n.instryments-solution .easing-currence {\\n    opacity: 1;\\n    transform: translate(0, 0);\\n    -webkit-animation: easing .5s linear;\\n            animation: easing .5s linear;\\n}\\n\\n@-webkit-keyframes easing {\\n    from {\\n        transform: translate(0, 100px);\\n    }\\n\\n    to {\\n        transform: translate(0, 0);\\n    }\\n}\\n\\n@keyframes easing {\\n    from {\\n        transform: translate(0, 100px);\\n    }\\n\\n    to {\\n        transform: translate(0, 0);\\n    }\\n}\\n\\n@media (max-width: 768px) {\\n    .enterprise-system_title {\\n        height: auto;\\n    }\\n\\n    .enterprise-system_title>p {\\n        max-width: 100vw;\\n    }\\n\\n    .page_enterprise-system ul {\\n        justify-content: space-between;\\n        padding: 0 1.6rem;\\n    }\\n\\n    .page_enterprise-system li {\\n        width: auto;\\n        line-height: 48px;\\n    }\\n\\n    .instryments-problem {\\n        background: none;\\n    }\\n\\n    .instryments-solution>div {\\n        margin: 0 auto;\\n    }\\n\\n    .instryments-problem>div>div {\\n        width: 75vw;\\n        height: auto;\\n        padding: 20px 10px;\\n        font-size: 16px;\\n    }\\n\\n    .instryments-solution>div>div {\\n        width: auto;\\n        height: auto;\\n        max-height: none;\\n    }\\n\\n    .instryments-solution>div>div::before {\\n        top: 2px;\\n    }\\n\\n    .instryments-solution>div>div {\\n        padding: 0 0 0 30px;\\n    }\\n\\n    .photo {\\n        position: relative;\\n        z-index: 1;\\n        left: 50%;\\n        top: auto;\\n        width: 4rem;\\n        transform: translate(-50%, 0);\\n        margin: 0 0 10px;\\n    }\\n\\n}\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/products/assets/index.css?./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/src");

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

eval("module.exports = \"<div class=\\\"site-header\\\">\\n    <a href=\\\"./index.html\\\">\\n        <!-- <img src=\\\"../images/logo.png\\\"> -->\\n    </a>\\n    <div class=\\\"small-screen-nav\\\">\\n        <img src=\\\"\" + __webpack_require__(/*! ../images/menu.png */ \"./src/assets/images/menu.png\") + \"\\\">\\n        <nav>\\n            <ul>\\n                <li><a id=\\\"home-link\\\" href=\\\"./index.html\\\">首页</a></li>\\n                <!-- <li><a id=\\\"home-link\\\" href=\\\"javascript:\\\">首页</a></li> -->\\n                <!-- <li><a id=\\\"products-link\\\" href=\\\"javascript:\\\">产品中心</a></li> -->\\n                <li><a id=\\\"products-link\\\" href=\\\"./products.html\\\">产品中心</a></li>\\n                <!-- <li><a id=\\\"about-link\\\" href=\\\"javascript:\\\">关于我们</a></li> -->\\n                <li><a id=\\\"about-link\\\" href=\\\"./aboutCham.html\\\">关于我们</a></li>\\n            </ul>\\n        </nav>\\n    </div>\\n    <nav class=\\\"large-screen-nav\\\">\\n        <ul>\\n            <li><a id=\\\"home-link\\\" href=\\\"./index.html\\\">首页</a></li>\\n            <!-- <li><a id=\\\"home-link\\\" href=\\\"javascript:\\\">首页</a></li> -->\\n            <!-- <li><a id=\\\"products-link\\\" href=\\\"javascript:\\\">产品中心</a></li> -->\\n            <li><a id=\\\"products-link\\\" href=\\\"./products.html\\\">产品中心</a></li>\\n            <!-- <li><a id=\\\"about-link\\\" href=\\\"javascript:\\\">关于我们</a></li> -->\\n            <li><a id=\\\"about-link\\\" href=\\\"./aboutCham.html\\\">关于我们</a></li>\\n        </ul>\\n    </nav>\\n</div>\";\n\n//# sourceURL=webpack:///./src/assets/components/header.html?");

/***/ }),

/***/ "./src/assets/images/close.png":
/*!*************************************!*\
  !*** ./src/assets/images/close.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/1f2016f9c7c7fda9bc3bb971dbcf79cd.png\";\n\n//# sourceURL=webpack:///./src/assets/images/close.png?");

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

/***/ "./src/assets/images/problemImg.png":
/*!******************************************!*\
  !*** ./src/assets/images/problemImg.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/45f97fe8a86cedfe438ecd404cc7184e.png\";\n\n//# sourceURL=webpack:///./src/assets/images/problemImg.png?");

/***/ }),

/***/ "./src/assets/index.css":
/*!******************************!*\
  !*** ./src/assets/index.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../node_modules/postcss-loader/src!./index.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/assets/index.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../node_modules/postcss-loader/src!./index.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/assets/index.css\",\n      function () {\n        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../node_modules/postcss-loader/src!./index.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/assets/index.css\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./src/assets/index.css?");

/***/ }),

/***/ "./src/assets/js/common/index.js":
/*!***************************************!*\
  !*** ./src/assets/js/common/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/header */ \"./src/assets/js/common/view/header.js\");\n/* harmony import */ var _view_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/footer */ \"./src/assets/js/common/view/footer.js\");\n/* harmony import */ var _images_menu_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/menu.png */ \"./src/assets/images/menu.png\");\n/* harmony import */ var _images_menu_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_menu_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _images_close_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/close.png */ \"./src/assets/images/close.png\");\n/* harmony import */ var _images_close_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_close_png__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _ieConfig_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ieConfig/index */ \"./src/assets/js/ieConfig/index.js\");\n\n\n\n\n // 显示菜单\n\nfunction showMenu() {\n  var img = document.querySelector('.small-screen-nav img');\n  img.src = _images_close_png__WEBPACK_IMPORTED_MODULE_3___default.a;\n  _ieConfig_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"].addClass(document.querySelector('.small-screen-nav nav'), 'visibleNav'); // document.querySelector('.small-screen-nav nav').classList.add('visibleNav')\n  // className\n\n  img.removeEventListener('click', showMenu);\n  img.addEventListener('click', hideMenu);\n} // 收起菜单\n\n\nfunction hideMenu() {\n  var img = document.querySelector('.small-screen-nav img');\n  img.src = _images_menu_png__WEBPACK_IMPORTED_MODULE_2___default.a;\n  _ieConfig_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"].removeClass(document.querySelector('.small-screen-nav nav'), 'visibleNav'); // document.querySelector('.small-screen-nav nav').classList.remove('visibleNav')\n\n  img.removeEventListener('click', hideMenu);\n  img.addEventListener('click', showMenu);\n} // 写入页面header和footer\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  // 页面内容\n  var Header = document.getElementsByTagName('header')[0],\n      Footer = document.getElementsByTagName('footer')[0];\n  new _view_header__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().mount(Header);\n  new _view_footer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().mount(Footer);\n  var img = document.querySelector('.small-screen-nav img');\n  if (img && img.addEventListener) img.addEventListener('click', showMenu);else {// IE \n  }\n});\n\n//# sourceURL=webpack:///./src/assets/js/common/index.js?");

/***/ }),

/***/ "./src/assets/js/common/view/footer.js":
/*!*********************************************!*\
  !*** ./src/assets/js/common/view/footer.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _components_footer_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/footer.html */ \"./src/assets/components/footer.html\");\n/* harmony import */ var _components_footer_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_footer_html__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default() {\n    _classCallCheck(this, _default);\n  }\n\n  _createClass(_default, [{\n    key: \"mount\",\n    value: function mount(container) {\n      container.innerHTML = _components_footer_html__WEBPACK_IMPORTED_MODULE_0___default.a;\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./src/assets/js/common/view/footer.js?");

/***/ }),

/***/ "./src/assets/js/common/view/header.js":
/*!*********************************************!*\
  !*** ./src/assets/js/common/view/header.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _components_header_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/header.html */ \"./src/assets/components/header.html\");\n/* harmony import */ var _components_header_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_header_html__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default() {\n    _classCallCheck(this, _default);\n  }\n\n  _createClass(_default, [{\n    key: \"mount\",\n    value: function mount(container) {\n      container.innerHTML = _components_header_html__WEBPACK_IMPORTED_MODULE_0___default.a;\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./src/assets/js/common/view/header.js?");

/***/ }),

/***/ "./src/assets/js/ieConfig/index.js":
/*!*****************************************!*\
  !*** ./src/assets/js/ieConfig/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// 添加类名\nfunction addClass(element, className) {\n  if (!element || !className) return;\n  if (element.classList) element.classList.add(className);else if (element.className === className) return;else element.className = className;\n}\n\nfunction removeClass(element, className) {\n  if (!element || !className) return;\n  if (element.classList) element.classList.remove(className);else if (element.className === className) element.classList = '';\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  addClass: addClass,\n  removeClass: removeClass\n});\n\n//# sourceURL=webpack:///./src/assets/js/ieConfig/index.js?");

/***/ }),

/***/ "./src/products/assets/imgs/amImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/amImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/c6cd64d7dd097e9d89ae8e8ec25a8a5c.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/amImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/bcmImg.png":
/*!*********************************************!*\
  !*** ./src/products/assets/imgs/bcmImg.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/dbc16ee9c6c528b7ff4c72544e4c6565.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/bcmImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/ccImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/ccImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/fcbfd59272e5c4e8af1af3cadcbd13bb.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/ccImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/cmImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/cmImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/074181d89e735c71f8a7bf55e4ef7de0.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/cmImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/ewImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/ewImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/789579a0668446e459db6bbbe47cf232.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/ewImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/gmImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/gmImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/d2fa6dff49b599237c31cf9529d756e2.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/gmImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/gpsImg.png":
/*!*********************************************!*\
  !*** ./src/products/assets/imgs/gpsImg.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/e372490bff3aeedfaa201df9c025f2d8.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/gpsImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/groupingImg.png":
/*!**************************************************!*\
  !*** ./src/products/assets/imgs/groupingImg.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/edebf684b510e6e3fb878458b1a628bd.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/groupingImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/msImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/msImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/ba47fe71c1819235510b5f439482c147.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/msImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/pmImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/pmImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/387e5ef2c92dda94c89685710b464fd3.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/pmImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/poImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/poImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/02ee6429f741cbdf946c529821de1ace.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/poImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/psImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/psImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/4b5e93e60473d3a9e546cafc7a7e41e3.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/psImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/saImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/saImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/1ad93218be1dd1f962682b0ef6370018.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/saImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/scImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/scImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/70a33dddc29974b8155457f6062ef833.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/scImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/slImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/slImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/c31560358dbcaa9b689f5decae6a0a7f.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/slImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/systemImg.png":
/*!************************************************!*\
  !*** ./src/products/assets/imgs/systemImg.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/3e543e3a5c62c76fb2d47d95fb5c4352.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/systemImg.png?");

/***/ }),

/***/ "./src/products/assets/imgs/tsImg.png":
/*!********************************************!*\
  !*** ./src/products/assets/imgs/tsImg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/6c3c76cb191653e80274f43babacc893.png\";\n\n//# sourceURL=webpack:///./src/products/assets/imgs/tsImg.png?");

/***/ }),

/***/ "./src/products/assets/index.css":
/*!***************************************!*\
  !*** ./src/products/assets/index.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/postcss-loader/src!./index.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/products/assets/index.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/postcss-loader/src!./index.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/products/assets/index.css\",\n      function () {\n        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/postcss-loader/src!./index.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/products/assets/index.css\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./src/products/assets/index.css?");

/***/ }),

/***/ "./src/products/assets/js/initPage.js":
/*!********************************************!*\
  !*** ./src/products/assets/js/initPage.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../index.html */ \"./src/products/index.html\");\n/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _switchTab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./switchTab */ \"./src/products/assets/js/switchTab.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n // 注册滚动监听\n\nfunction addScrollEvent(targetFunction) {\n  window.addEventListener('scroll', targetFunction);\n} // 动画事件 问题模块 \n// getBoundingClientRect top 包括padding\n\n\nfunction animation() {\n  var target = document.querySelector('.instryments-problem');\n  if (!target) return;\n  document.querySelector('.instryments-problem div').classList.add('easing-currence');\n} // 动画事件 解决方案模块\n\n\nfunction solutionAnimation() {\n  var target = document.querySelector('.instryments-solution');\n  if (!target) return;\n  var targetPosition = target.getBoundingClientRect(),\n      top = targetPosition.top,\n      windowHeight = window.innerHeight || document.documentElement.clientHeight;\n\n  if (top <= windowHeight) {\n    // 缓动浮现标题\n    document.querySelector('.instryments-solution h3').classList.add('easing-currence');\n    window.removeEventListener('scroll', solutionAnimation);\n    addScrollEvent(h6Animation);\n  }\n} // h6缓动事件\n\n\nfunction h6Animation() {\n  var target = document.querySelector('.instryments-solution h6');\n  if (!target) return;\n  var targetPosition = target.getBoundingClientRect(),\n      top = targetPosition.top,\n      windowHeight = window.innerHeight || document.documentElement.clientHeight;\n\n  if (top <= windowHeight) {\n    // 缓动浮现标题\n    target.classList.add('easing-currence');\n    window.removeEventListener('scroll', h6Animation);\n    addScrollEvent(divAnimation);\n  }\n} // div 缓动事件\n\n\nfunction divAnimation() {\n  var targetList = document.querySelectorAll('.instryments-solution div div'),\n      targetBox = document.querySelector('.instryments-solution'),\n      windowHeight = window.innerHeight || document.documentElement.clientHeight;\n  if (!targetList) return;\n\n  for (var i = 0; i < targetList.length; i++) {\n    var target = targetList[i],\n        targetPosition = target.getBoundingClientRect(),\n        top = targetPosition.top; // 缓动浮现标题\n\n    if (top <= windowHeight) target.classList.add('easing-currence');\n  } // 移除滚动监听\n\n\n  if (targetBox && targetBox.getBoundingClientRect().bottom <= windowHeight) {\n    window.removeEventListener('scroll', divAnimation);\n  }\n}\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default() {\n    _classCallCheck(this, _default);\n  }\n\n  _createClass(_default, [{\n    key: \"mount\",\n    value: function mount(container, pageKey) {\n      var _this = this;\n\n      this.instrumentVisit = 0;\n      this.warehousingVisit = 0;\n      this.logisticsVisit = 0;\n      this.windowHeight = window.innerHeight || document.documentElement.clientHeight;\n      container.innerHTML = _index_html__WEBPACK_IMPORTED_MODULE_0___default.a;\n      var search = decodeURIComponent(location.search);\n      if (search) pageKey = search.split('=')[1];else pageKey = 'instruments';\n      Object(_switchTab__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(pageKey); // 加载动画\n\n      animation(); // window.addEventListener('scroll', solutionAnimation)\n\n      addScrollEvent(solutionAnimation);\n\n      switch (pageKey) {\n        case 'instruments':\n          this.instrumentVisit++;\n          break;\n\n        case 'warehousing-system':\n          this.warehousingVisit++;\n          break;\n\n        case 'logistics':\n          this.logistics++;\n          break;\n\n        default:\n          break;\n      }\n\n      document.querySelector('#product-instruments').addEventListener('click', function () {\n        Object(_switchTab__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('instruments'); // 加载动画\n\n        if (!_this.instrumentVisit) {\n          animation();\n          addScrollEvent(solutionAnimation);\n        }\n\n        _this.instrumentVisit++;\n      });\n      document.querySelector('#product-warehousing').addEventListener('click', function () {\n        // alert('#product-warehousing')\n        Object(_switchTab__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('warehousing-system'); // 加载动画\n\n        if (!_this.warehousingVisit) {\n          animation();\n          addScrollEvent(solutionAnimation);\n        }\n\n        _this.warehousingVisit++;\n      });\n      document.querySelector('#product-logistics').addEventListener('click', function () {\n        // alert('#product-logistics')\n        Object(_switchTab__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('logistics'); // 加载动画\n\n        if (!_this.logisticsVisit) {\n          animation();\n          addScrollEvent(solutionAnimation);\n        }\n\n        _this.logisticsVisit++;\n      });\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./src/products/assets/js/initPage.js?");

/***/ }),

/***/ "./src/products/assets/js/switchTab.js":
/*!*********************************************!*\
  !*** ./src/products/assets/js/switchTab.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_instruments_instruments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/instruments/instruments */ \"./src/products/components/instruments/instruments.js\");\n/* harmony import */ var _components_logistics_logistics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/logistics/logistics */ \"./src/products/components/logistics/logistics.js\");\n/* harmony import */ var _components_warehousing_system_warehousing_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/warehousing-system/warehousing-system */ \"./src/products/components/warehousing-system/warehousing-system.js\");\nfunction _readOnlyError(name) { throw new Error(\"\\\"\" + name + \"\\\" is read-only\"); }\n\n// 医疗器械\n // 第三方物流\n\n // 仓储系统\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (pageKey) {\n  // let viewPromise\n  // switch (pageKey) {\n  //     case 'instruments':\n  //         viewPromise = import( /* webpackChunkName: \"instruments\" */ '../../components/instruments/instruments')\n  //         break;\n  //     case 'logistics':\n  //         viewPromise = import( /* webpackChunkName: \"logistics\" */ '../../components/logistics/logistics')\n  //         break\n  //     case 'warehousing-system':\n  //         viewPromise = import( /* webpackChunkName: \"warehousing-system\" */ '../../components/warehousing-system/warehousing-system')\n  //         break\n  //     default:\n  //         viewPromise = import( /* webpackChunkName: \"instruments\" */ '../../components/instruments/instruments')\n  //         break;\n  // }\n  var view = {\n    'instruments': _components_instruments_instruments__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    'logistics': _components_logistics_logistics__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    'warehousing-system': _components_warehousing_system_warehousing_system__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  }[pageKey]; // path路径错误\n\n  view ? view : view = (_readOnlyError(\"view\"), _components_instruments_instruments__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n  new view().mount(document.getElementById('enterprise-system_content')); // viewPromise.then(module => {\n  //     const view = new module.default()\n  //     view.mount(document.getElementById('enterprise-system_content'))\n  // })\n});\n\n//# sourceURL=webpack:///./src/products/assets/js/switchTab.js?");

/***/ }),

/***/ "./src/products/components/instruments/instruments.html":
/*!**************************************************************!*\
  !*** ./src/products/components/instruments/instruments.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"module_instruments\\\">\\n    <div class=\\\"instryments-problem\\\">\\n        <h3>是否遇见以下问题</h3>\\n        <div>\\n            <div>普通ERP不符合药监规定，无法进行质量管控。</div>\\n            <div>多公司难以集团化管控、数据实时共享。</div>\\n            <div>业务信息零散导致数据分析困难，无法提供决策。</div>\\n        </div>\\n    </div>\\n    <div class=\\\"instryments-solution\\\">\\n        <h3>\\n            我们为您解决\\n        </h3>\\n        <h6>适用企业：大中型医疗器械（Ⅰ类、Ⅱ类、Ⅲ类）经营企业</h6>\\n        <div>\\n            <div class=\\\"gps\\\">\\n                <h6>GPS规范</h6>\\n                <p>完全符合新版GPS要求，包括：经营范围的控制、证照效期控制及预警、商品批号效期及预警等。</p>\\n            </div>\\n            <div class=\\\"price-system\\\">\\n                <h6>价格体系</h6>\\n                <p>丰富的价格体系，包括：协议价、中标价、价格加成、优惠价最低价、最高价等。</p>\\n            </div>\\n            <div class=\\\"shopping-list\\\">\\n                <h6>采购计划</h6>\\n                <p>支持按商品类别、采购员、供应商、销量预测、库存周转率、渠道等生成采购计划。</p>\\n            </div>\\n            <div class=\\\"settlement-control\\\">\\n                <h6>结算控制</h6>\\n                <p>支持现结、预付、周结、月结翻单结、实销实结等。严格控制到票后付款。</p>\\n            </div>\\n            <div class=\\\"grouping\\\">\\n                <h6>集团化</h6>\\n                <p>支持集团化管理、实现数据共享、集团化经营分析。</p>\\n            </div>\\n            <div class=\\\"authority-management\\\">\\n                <h6>权限管理</h6>\\n                <p>支持功能权限控制，支持数据权限、字段权限控制等。</p>\\n            </div>\\n            <div class=\\\"strategic-analysis\\\">\\n                <h6>决策分析</h6>\\n                <p>\\n                    多样化报表模型，包括：品类分析、销售分析、库存分心、往来分析，同比、环比等。\\n                </p>\\n            </div>\\n            <div class=\\\"channel-control\\\">\\n                <h6>渠道管控</h6>\\n                <p>完善的渠道管控，结合“两票制”政策和上下游企业供销关系、业务员关系等。</p>\\n            </div>\\n            <div class=\\\"traceability-system\\\">\\n                <h6>追溯体系</h6>\\n                <p>完整的质量追溯体系、确保全过程可追溯。</p>\\n            </div>\\n            <div class=\\\"credit-control\\\">\\n                <h6>资信控制</h6>\\n                <p>支持资信额度、资信天数控制，结合消息预警、订单管理、账龄分析等进行管控。</p>\\n            </div>\\n        </div>\\n    </div>\\n</div>\";\n\n//# sourceURL=webpack:///./src/products/components/instruments/instruments.html?");

/***/ }),

/***/ "./src/products/components/instruments/instruments.js":
/*!************************************************************!*\
  !*** ./src/products/components/instruments/instruments.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _instruments_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instruments.html */ \"./src/products/components/instruments/instruments.html\");\n/* harmony import */ var _instruments_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_instruments_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_js_switchTab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/js/switchTab */ \"./src/products/assets/js/switchTab.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default() {\n    _classCallCheck(this, _default);\n  }\n\n  _createClass(_default, [{\n    key: \"mount\",\n    value: function mount(container) {\n      container.innerHTML = _instruments_html__WEBPACK_IMPORTED_MODULE_0___default.a;\n      var activeTab = document.querySelector('.activeTab'),\n          tabInstruments = document.querySelector('#product-instruments');\n      if (activeTab) activeTab.classList.remove('activeTab');\n\n      if (tabInstruments) {\n        tabInstruments.classList.add('activeTab');\n        tabInstruments.addEventListener('click', function () {\n          Object(_assets_js_switchTab__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('instruments');\n        });\n      }\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./src/products/components/instruments/instruments.js?");

/***/ }),

/***/ "./src/products/components/logistics/logistics.html":
/*!**********************************************************!*\
  !*** ./src/products/components/logistics/logistics.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"module_instruments\\\">\\n    <div class=\\\"instryments-problem\\\">\\n        <h3>是否遇见以下问题</h3>\\n        <div>\\n            <div>普通ERP不符合药监规定，无法进行质量管控。</div>\\n            <div>大量的终端客户，传统业务人员手工制单模式无法应对。</div>\\n            <div>对采购计划、库存周转、拣配效率要求高。</div>\\n        </div>\\n    </div>\\n    <div class=\\\"instryments-solution\\\">\\n        <h3>\\n            我们为您解决\\n        </h3>\\n        <h6>适用企业:医疗器械批发、耗材批发、B2B耗材批发等经营企业</h6>\\n        <div>\\n            <div class=\\\"gps\\\">\\n                <h6>GPS规范</h6>\\n                <p>完全符合新版GPS要求，包括：经营范围的控制、证照效期控制及预警、商品批号效期及预警等。</p>\\n            </div>\\n            <div class=\\\"price-system\\\">\\n                <h6>价格体系</h6>\\n                <p>丰富的价格体系，包括：协议价、中标价、价格加成、优惠价最低价、最高价等。</p>\\n            </div>\\n            <div class=\\\"shopping-list\\\">\\n                <h6>采购计划</h6>\\n                <p>支持按商品类别、采购员、供应商、销量预测、库存周转率、渠道等生成采购计划。</p>\\n            </div>\\n            <div class=\\\"product-management\\\">\\n                <h6>丰富的商品管理</h6>\\n                <p>商品多级分类、商品多级单位，自定义显示库存等。</p>\\n            </div>\\n            <div class=\\\"traceability-system\\\">\\n                <h6>追溯体系</h6>\\n                <p>完整的质量追溯体系、确保全过程可追溯。</p>\\n            </div>\\n            <div class=\\\"authority-management\\\">\\n                <h6>权限管理</h6>\\n                <p>支持功能权限控制，支持数据权限、字段权限控制等。</p>\\n            </div>\\n            <div class=\\\"strategic-analysis\\\">\\n                <h6>决策分析</h6>\\n                <p>\\n                    多样化报表模型，包括：品类分析、销售分析、库存分心、往来分析，同比、环比等。\\n                </p>\\n            </div>\\n            <div class=\\\"promotion-management\\\">\\n                <h6>促销管理</h6>\\n                <p>多种促销方案：买赠、折扣、组合、优惠等。</p>\\n            </div>\\n        </div>\\n    </div>\\n</div>\";\n\n//# sourceURL=webpack:///./src/products/components/logistics/logistics.html?");

/***/ }),

/***/ "./src/products/components/logistics/logistics.js":
/*!********************************************************!*\
  !*** ./src/products/components/logistics/logistics.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _logistics_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logistics.html */ \"./src/products/components/logistics/logistics.html\");\n/* harmony import */ var _logistics_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_logistics_html__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n // 第三方物流\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default() {\n    _classCallCheck(this, _default);\n  }\n\n  _createClass(_default, [{\n    key: \"mount\",\n    value: function mount(container) {\n      container.innerHTML = _logistics_html__WEBPACK_IMPORTED_MODULE_0___default.a;\n      var activeTab = document.querySelector('.activeTab'),\n          tabLogistics = document.querySelector('#product-logistics');\n      if (activeTab) activeTab.classList.remove('activeTab');\n\n      if (tabLogistics) {\n        tabLogistics.classList.add('activeTab');\n      }\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./src/products/components/logistics/logistics.js?");

/***/ }),

/***/ "./src/products/components/warehousing-system/warehousing-system.html":
/*!****************************************************************************!*\
  !*** ./src/products/components/warehousing-system/warehousing-system.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"module_instruments\\\">\\n    <div class=\\\"instryments-problem\\\">\\n        <h3>是否遇见以下问题</h3>\\n        <div>\\n            <div>普通物流仓储系统不符合药监规定，难以质量管控。</div>\\n            <div>与上游ERP或OMS系统无对接，导致信息不对成。</div>\\n            <div>仓储作业不规范、拣配不合理等人为因素导致效率降低。</div>\\n        </div>\\n    </div>\\n    <div class=\\\"instryments-solution\\\">\\n        <h3>\\n            我们为您解决\\n        </h3>\\n        <h6>适用企业:第三方物流、自建物流中心</h6>\\n        <div>\\n            <div class=\\\"multi-service\\\">\\n                <h6>支持多业务模式</h6>\\n                <p>自建物流中心、第三方物流中心、委托配送等。</p>\\n            </div>\\n            <div class=\\\"bar-code-management\\\">\\n                <h6>全过程条码化管理</h6>\\n                <p>货位条码化、作业条码等，紧密结合PDA设备，提高工作效率。</p>\\n            </div>\\n            <div class=\\\"process-oriented\\\">\\n                <h6>符合统一流程化管理</h6>\\n                <p>自建物流中心、第三方物流中心、委托配送等。</p>\\n            </div>\\n            <div class=\\\"gps\\\">\\n                <h6>完全符合新版GSP要求</h6>\\n                <p>首营资质审核、批号效期控制、库内养护作业、各类GSP记录等。</p>\\n            </div>\\n            <div class=\\\"early-warning\\\">\\n                <h6>支持各类预警</h6>\\n                <p>批号效期入库预警、批号效期超期预警、注册证效期预警、供应商及客户经营证照效期预警，极大规避作业差错。</p>\\n            </div>\\n            <div class=\\\"product-management\\\">\\n                <h6>采用商品批次管理</h6>\\n                <p>实现商品的入库、出库、保管过程的可追溯，支持逆向跟踪。</p>\\n            </div>\\n        </div>\\n    </div>\\n</div>\";\n\n//# sourceURL=webpack:///./src/products/components/warehousing-system/warehousing-system.html?");

/***/ }),

/***/ "./src/products/components/warehousing-system/warehousing-system.js":
/*!**************************************************************************!*\
  !*** ./src/products/components/warehousing-system/warehousing-system.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _warehousing_system_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warehousing-system.html */ \"./src/products/components/warehousing-system/warehousing-system.html\");\n/* harmony import */ var _warehousing_system_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_warehousing_system_html__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default() {\n    _classCallCheck(this, _default);\n  }\n\n  _createClass(_default, [{\n    key: \"mount\",\n    value: function mount(container) {\n      container.innerHTML = _warehousing_system_html__WEBPACK_IMPORTED_MODULE_0___default.a;\n      var activeTab = document.querySelector('.activeTab'),\n          tabWarehousing = document.querySelector('#product-warehousing');\n      if (activeTab) activeTab.classList.remove('activeTab');\n      if (tabWarehousing) tabWarehousing.classList.add('activeTab');\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./src/products/components/warehousing-system/warehousing-system.js?");

/***/ }),

/***/ "./src/products/index.html":
/*!*********************************!*\
  !*** ./src/products/index.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = \"<div class=\\\"page_enterprise-system\\\">\\n    <!-- 1渐变背景色 2背景图片-->\\n    <div class=\\\"enterprise-system_title\\\">\\n        <img class=\\\"photo\\\" src='\" + __webpack_require__(/*! ./assets/imgs/systemImg.png */ \"./src/products/assets/imgs/systemImg.png\") + \"' />\\n        <h2>\\n            医疗器械企业管理系统\\n        </h2>\\n        <p>\\n            符合药监系统的一体化ERP系统，能满足对进、销、存的全部需求，其强大的报表分析系统也能助力企业决策及数据统计。同时，系统可对接财务系统、各类标准API的外部系统等，使管理更便捷。\\n        </p>\\n    </div>\\n    <ul id=\\\"products-tab\\\">\\n        <li id=\\\"product-instruments\\\">\\n            <p><a href=\\\"javascript:\\\">医疗器械版</a></p>\\n        </li>\\n        <li id=\\\"product-warehousing\\\">\\n            <p><a href=\\\"javascript:\\\">医疗批发版</a></p>\\n        </li>\\n        <li id=\\\"product-logistics\\\">\\n            <p><a href=\\\"javascript:\\\">第三方物流</a></p>\\n        </li>\\n    </ul>\\n    <div id=\\\"enterprise-system_content\\\" class=\\\"enterprise-system_content\\\">\\n        <!-- 产品中心 -->\\n\\n    </div>\\n</div>\";\n\n//# sourceURL=webpack:///./src/products/index.html?");

/***/ }),

/***/ "./src/products/index.js":
/*!*******************************!*\
  !*** ./src/products/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/index.css */ \"./src/assets/index.css\");\n/* harmony import */ var _assets_index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_index_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/index.css */ \"./src/products/assets/index.css\");\n/* harmony import */ var _assets_index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_index_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_js_common_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/js/common/index */ \"./src/assets/js/common/index.js\");\n/* harmony import */ var _assets_js_initPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/js/initPage */ \"./src/products/assets/js/initPage.js\");\n// import template from './erp.html'\n\n\n\n // import header from '../assets/components/header.html'\n// import footer from '../assets/components/footer.html'\n// 页面内容\n\nObject(_assets_js_common_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(); // let Header = document.getElementsByTagName('header')[0],\n//     Footer = document.getElementsByTagName('footer')[0],\n\nvar container = document.getElementById('site-page-content'); // Header.innerHTML = header\n// Footer.innerHTML = footer\n// document.querySelector('.site-header img').onclick = () =>{\n//     location.pathname = '/index.html'\n// }\n\nnew _assets_js_initPage__WEBPACK_IMPORTED_MODULE_3__[\"default\"]().mount(container);\n\n//# sourceURL=webpack:///./src/products/index.js?");

/***/ })

/******/ });