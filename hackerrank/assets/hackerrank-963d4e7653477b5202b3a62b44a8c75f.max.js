(function ($){
    $.fn.completer = function(cat, data){
        var that = this;
        data = $.extend({
            source: function(typeahead, query){
                $.getJSON('/autocomplete', {fq: 'cat:'+cat,q: query+"*"},
                    function(resp){
                        typeahead.process(_.map(resp.models, function(e){
                            return e.name;
                        }));
                });
            },
            matcher: function(item){
                return true;
            }
        }, data);
        this.typeahead(data);
    };
}(jQuery));
(function() {
  (function($) {
    $.dragResize = {
      version: '1.0'
    };
    return $.fn.dragResize = function(options) {
      var default_options, enable_resize, that;
      default_options = {
        resize: function(pageX, pageY) {},
        activeColor: "#AAA",
        inactiveColor: "#DDD"
      };
      that = this;
      options = $.extend(default_options, options);
      enable_resize = false;
      $(this).mousedown(function(e) {
        enable_resize = true;
        return false;
      });
      $(this).mouseup(function(e) {
        return enable_resize = false;
      });
      $(this).mouseenter(function(e) {
        return $(that).css('background-color', options.activeColor);
      });
      $(this).mouseleave(function(e) {
        return $(that).css('background-color', options.inactiveColor);
      });
      $(window).mouseout(function(e) {
        if (e.relatedTarget === null) {
          return enable_resize = false;
        }
      });
      return $(window).mousemove(function(e) {
        if (enable_resize === true) {
          if (e.pageY < 0 || e.pageY > document.height || e.pageX < 0 || e.pageX > document.width) {
            enable_resize = false;
          }
          return options.resize(e.pageX, e.pageY);
        }
      });
    };
  })($);

}).call(this);
(function() {
  _.mixin({
    capitalize: function(string) {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var CommonController, HR, _ref;
    CommonController = (function(_super) {
      __extends(CommonController, _super);

      function CommonController() {
        return CommonController.__super__.constructor.apply(this, arguments);
      }

      CommonController.prototype.log = Backbone.log;

      CommonController.prototype.staticPath = function(path, base_path) {
        if (base_path == null) {
          base_path = null;
        }
        path = HR.MANIFEST && HR.MANIFEST[path] ? HR.MANIFEST[path] : path;
        if (HR.PREFETCH_DATA && HR.PREFETCH_DATA.metadata) {
          base_path || (base_path = HR.PREFETCH_DATA.metadata.asset_path);
        }
        return "" + base_path + "/" + path;
      };

      CommonController.prototype.addTemplate = function(logical_path, template) {
        var callback, errorCallback, number_paths, postCallbacks, preCallbacks;
        HR.templates[logical_path] = template;
        number_paths = arguments.length - 1;
        callback = _.last(arguments);
        errorCallback = null;
        if (typeof arguments[arguments.length - 2] === "function") {
          number_paths = arguments.length - 2;
          callback = arguments[arguments.length - 2];
          errorCallback = _.last(arguments);
        }
        preCallbacks = [];
        return postCallbacks = [];
      };

      CommonController.prototype.requires = function(deps, success_callback, error_callback, options) {
        var postCallbacks, preCallbacks, staticFiles, _error_callback, _success_callback;
        if (options == null) {
          options = {};
        }
        preCallbacks = [];
        postCallbacks = [];
        staticFiles = _.map(deps, (function(_this) {
          return function(path) {
            success_callback;
            var inject_mathjax_config;
            if (path === "MathJax/MathJax") {
              if ($("#mathjax-config").length === 0) {
                inject_mathjax_config = "<script id=\"mathjax-config\" type=\"text/x-mathjax-config\">\n  MathJax.Hub.Config({\n    tex2jax: {\n        inlineMath: [['$','$']],\n        processEscapes: true\n      }\n  });\n</script>";
                $("html").append(inject_mathjax_config);
              }
              postCallbacks.push(function() {
                if (typeof MathJax !== "undefined") {
                  return MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                }
              });
              return "https://hrcdn.net/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
            } else {
              if (options.ignore_prefix) {
                return "/" + path + ".js";
              } else {
                return HR.appController.staticPath("" + path + ".js");
              }
            }
          };
        })(this));
        _success_callback = function() {
          _.each(preCallbacks, function(callback) {
            return callback();
          });
          success_callback();
          return _.each(postCallbacks, function(callback) {
            return callback();
          });
        };
        _error_callback = function(error) {
          _errs.push(error);
          if (_.isFunction(error_callback)) {
            return error_callback(error);
          }
        };
        return require(staticFiles, _success_callback, _error_callback);
      };

      CommonController.prototype.loadCodeMirror = function(success_callback, error_callback) {
        if (error_callback == null) {
          error_callback = function() {};
        }
        return HR.requires(['codemirror_basic'], (function(_this) {
          return function() {
            return success_callback();
          };
        })(this), (function(_this) {
          return function(error) {
            return error_callback(error);
          };
        })(this));
      };

      CommonController.prototype.loadCodeMirrorMode = function(lang, callback) {
        return HR.appController.loadCodeMirror(function() {
          var args, mode_s;
          args = [];
          if (lang_mode_location_unconventional_mapping[lang]) {
            mode_s = lang_mode_location_unconventional_mapping[lang];
            if (!_.isArray(mode_s)) {
              mode_s = [mode_s];
            }
            args.push(mode_s);
          } else {
            args.push(["codemirror/mode/" + lang + "/" + lang]);
          }
          args.push((function(_this) {
            return function() {
              return callback();
            };
          })(this));
          args.push((function(_this) {
            return function(error) {
              return callback(error);
            };
          })(this));
          if (HR.development) {
            args.push({
              ignore_prefix: true
            });
          }
          return HR.requires.apply(this, args);
        });
      };

      return CommonController;

    })(Backbone.Model);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.CommonController = CommonController;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var AppController, HR, _ref;
    AppController = (function(_super) {
      __extends(AppController, _super);

      function AppController() {
        return AppController.__super__.constructor.apply(this, arguments);
      }

      AppController.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.MODELS_DEF = {
          "profile": HR.ProfileModel,
          "network": HR.NetworksModel,
          "challenge": HR.ChallengeModel,
          "contest": HR.ContestModel,
          "playoff": HR.PlayoffModel,
          "email-preferences": HR.EmailPreferencesModel,
          "submission": HR.SubmissionModel,
          "gameset": HR.GameSetModel,
          "game": HR.GameModel,
          "hackerprofile": HR.HackerProfileModel,
          "hackerhackos": HR.HackerHackosModel,
          "module": HR.ModuleModel,
          "managechallenge": HR.Manage_ChallengeModel,
          "managecontest": HR.Manage_ContestModel,
          "managetemplate": HR.Manage_TemplateModel,
          "testcase": HR.TestCaseModel,
          "challengeassociation": HR.ChallengeAssociationModel,
          "hackerapplication": HR.HackerApplicationModel,
          "hackerchallenge": HR.HackerChallengeModel,
          "blog": HR.BlogModel,
          "hackerprogress": HR.HackerProgressModel,
          "moduleprogress": HR.ModuleProgressModel,
          "trackprogress": HR.TrackProgressModel,
          "track": HR.TrackModel,
          "administration-contest": HR.Administration_ContestModel,
          "administration-challenge": HR.Administration_ChallengeModel,
          "administration-company": HR.Administration_CompanyModel,
          "administration-company_office": HR.Administration_CompanyOfficeModel,
          "administration-company_position": HR.Administration_CompanyPositionModel,
          "administration-test_case": HR.Administration_TestCaseModel,
          "administration-company_hacker_shortlist": HR.Administration_CompanyHackerShortlistModel
        };
        return this.COLLECTIONS_DEF = {
          "challenges": HR.ChallengesCollection,
          "network-leaderboard": HR.NetworkLeaderboardCollection,
          "extended-network": HR.ExtendedNetworkCollection,
          "leaderboard": HR.LeaderboardCollection,
          "submissions": HR.SubmissionsCollection,
          "grouped-submissions": HR.GroupedSubmissionsCollection,
          "chronological-submissions": HR.ChronologicalSubmissionsCollection,
          "gameset": HR.GameSetCollection,
          "notifications": HR.NotificationsCollection,
          "hackeractivity": HR.HackerActivityCollection,
          "hackerpost": HR.HackerPostCollection,
          "hackerevent": HR.HackerEventCollection,
          "playoffs": HR.PlayoffCollection,
          "contests": HR.ContestsCollection,
          "managechallenge": HR.ManageChallengeListCollection,
          "managecontest": HR.ManageContestListCollection,
          "testcase": HR.TestCaseCollection,
          "challengeassociation": HR.ChallengeAssociationCollection,
          "mods": HR.ModsCollection,
          "companies": HR.CompaniesCollection,
          "hackerapplications": HR.HackerApplicationsCollection,
          "hackerchallenges": HR.HackerChallengesCollection,
          "blogs": HR.BlogsCollection,
          "blogtemplates": HR.BlogTemplatesCollection,
          "secondaryemails": HR.SecondaryEmailCollection,
          "hacker-clubs": HR.HackerClubCollection,
          "submission_hackers": HR.ManageSubmissionsHackersCollection,
          "contestaccess": HR.ContestAccessCollection,
          "campus-rep-stats-collection": HR.CampusRepStatsCollection,
          "hackerhackos": HR.HackerHackosCollection,
          "administration-contests": HR.Administration_ContestsCollection,
          "administration-challenges": HR.Administration_ChallengesCollection,
          "administration-companies": HR.Administration_CompaniesCollection,
          "administration-test_cases": HR.Administration_TestCasesCollection,
          "administration-company-contests": HR.Administration_CompanyContestsCollection,
          "administration-hackerboard": HR.Administration_HackerboardCollection,
          "administration-hackerboard-submissions": HR.Administration_HackerboardSubmissionsCollection
        };
      };

      AppController.prototype.namespace = function(contest_slug, rest) {
        if (rest == null) {
          rest = false;
        }
        contest_slug || (contest_slug = "master");
        if (contest_slug === "master" && (!rest)) {
          return "/";
        } else {
          return "/contests/" + contest_slug + "/";
        }
      };

      AppController.prototype.get_challenge_pageURL = function(contest_slug, challenge_slug) {
        var challenge_bit;
        challenge_bit = "challenges/" + challenge_slug;
        if (contest_slug === "master") {
          return "/" + challenge_bit;
        } else {
          return "/contests/" + contest_slug + "/" + challenge_bit;
        }
      };

      AppController.prototype.contest = function(options) {
        if (options == null) {
          options = {};
        }
        if (!options.slug || options.slug === HR.appController.get_current_contest_slug()) {
          if (this.current_contest) {
            if (this.current_contest.get('slug') !== HR.appController.get_current_contest_slug()) {
              this.current_contest = HR.model('contest');
            }
          } else {
            this.current_contest = HR.model('contest');
          }
          if (HR.appController.get_current_contest_slug()) {
            this.current_contest.set('slug', HR.appController.get_current_contest_slug());
          }
          return this.current_contest.cached();
        } else {
          return HR.model('contest', {
            slug: HR.appController.get_current_contest_slug()
          }).cached(options);
        }
      };

      AppController.prototype.get_current_contest_slug = function() {
        this.landing_contest_slug = this.landing_contest_slug === void 0 ? HR.PREFETCH_DATA.metadata.landing_contest_slug : this.landing_contest_slug;
        return this.landing_contest_slug;
      };

      AppController.prototype.get_current_contest_namespace = function() {
        this.current_contest_namespace = this.current_contest_namespace === void 0 ? HR.PREFETCH_DATA.metadata.current_contest_namespace : this.current_contest_namespace;
        return this.current_contest_namespace;
      };

      AppController.prototype.is_using_contest_namespace = function() {
        this.using_contest_namespace = this.using_contest_namespace === void 0 ? HR.PREFETCH_DATA.metadata.using_contest_namespace : this.using_contest_namespace;
        return this.using_contest_namespace;
      };

      AppController.prototype.get_current_contest_home_url = function() {
        return "" + (HR.appController.get_current_contest_namespace()) + "/challenges";
      };

      AppController.prototype.get_current_contest_slug_url = function() {
        var slug;
        slug = HR.appController.get_current_contest_slug();
        if (slug === "master") {
          return "";
        } else {
          return "/" + slug;
        }
      };

      AppController.prototype.set_contest_namespace = function(contest_slug) {
        if (contest_slug !== "master" && !(HR.appView.contentView instanceof HR.ChallengesView)) {
          HR.appView.contestNavigationView.setContestSlug(contest_slug);
        } else {
          HR.appView.contestNavigationView.hide();
        }
        if (HR.appController.get_current_contest_slug() !== contest_slug) {
          this.landing_contest_slug = contest_slug;
          this.current_contest_namespace = (contest_slug === "master" ? "" : "/contests/" + contest_slug);
          this.using_contest_namespace = contest_slug !== "master";
          this.current_contest = HR.model('contest');
          if (HR.appView.navigationView.nav_buttons) {
            HR.appView.navigationView.nav_buttons.updateLinks();
          }
          if (HR.appView.countdownTimerView) {
            HR.appView.countdownTimerView.setContest(HR.contest().cached());
          }
        }
        HR.contest().unSetContestBroadcast();
        return HR.contest().setContestBroadcast();
      };

      AppController.prototype.object = function(suffix, name, attributes, options) {
        var Obj, clsName, obj, stringName;
        stringName = name.toTitleCase() + "-" + suffix;
        clsName = $.camelCase(stringName);
        Obj = HR[clsName];
        if (!Obj) {
          if (suffix === "model") {
            Obj = this.MODELS_DEF[name];
          } else if (suffix === "collection") {
            Obj = this.COLLECTIONS_DEF[name];
          }
          if (!Obj) {
            throw "HR." + clsName + " is not defined";
          }
        }
        obj = new Obj(attributes, options);
        obj.contest_slug = (attributes || {}).contest_slug || (options || {}).contest_slug;
        return obj;
      };

      AppController.prototype.model = function(name, attributes, options) {
        var model;
        model = HR.appController.object("model", name, attributes, options);
        return model;
      };

      AppController.prototype.collection = function(name, attributes, options) {
        return HR.appController.object("collection", name, attributes, options);
      };

      AppController.prototype.profile = function(options) {
        if (options == null) {
          options = {};
        }
        if (this._profile && _.size(options) > 0) {
          this._profile.cached(options);
        } else if (!this._profile) {
          this._profile = this.model('profile').cached(options);
          this._profile.listenTo(this._profile, 'reset', (function(_this) {
            return function() {
              return HR.key_prefix = _this._profile.get('key_prefix');
            };
          })(this));
        }
        return this._profile;
      };

      AppController.prototype.restURL = function(path, restPrefix) {
        if (restPrefix) {
          path = "/rest" + path;
        }
        return path;
      };

      AppController.prototype.templatePath = function(template) {
        var base_path;
        base_path = null;
        if (window.IE_BROWSER) {
          base_path = '/assets';
        }
        return this.staticPath("backbone/templates/" + template, base_path);
      };

      AppController.prototype.logicalTemplatePath = function(template) {
        return "backbone/templates/" + template;
      };

      AppController.prototype.postFetchTemplates = function() {
        var that;
        that = this;
        return _.each(arguments, function(argument) {
          return that.template(argument);
        });
      };

      AppController.prototype.template = function(template_name, template_callback, view_loader) {
        var each_inline_template, logical_template_path, that, _i, _len, _ref;
        if (template_name == null) {
          template_name = null;
        }
        if (template_callback == null) {
          template_callback = null;
        }
        if (view_loader == null) {
          view_loader = true;
        }
        HR.templates = HR.templates || {};
        logical_template_path = this.logicalTemplatePath(template_name);
        if (this.template_callbacks === void 0) {
          this.template_callbacks = {};
          if ($('script[type="text/template"]').length > 0) {
            _ref = $('script[type="text/template"]');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              each_inline_template = _ref[_i];
              HR.templates[this.logicalTemplatePath($(each_inline_template).attr('id'))] = _.template($(each_inline_template).html());
            }
          }
        }
        if (template_name !== null && HR.templates[logical_template_path] !== void 0 && HR.templates[logical_template_path] !== "--insync--") {
          template_callback = null;
          return HR.templates[logical_template_path];
        } else {
          if (this.template_callbacks[template_name] === void 0) {
            this.template_callbacks[template_name] = [];
          }
          if (template_callback !== null) {
            this.template_callbacks[template_name].push(template_callback);
            template_callback = null;
          }
          if (HR.templates[logical_template_path] !== "--insync--") {
            HR.templates[logical_template_path] = "--insync--";
            that = this;
            if (HR.util && HR.util.ajaxmsg) {
              HR.util.ajaxmsg("Loading ...", true, false);
            }
            $.ajax({
              url: this.templatePath("" + template_name + ".js"),
              dataType: "script",
              success: function(data, textStatus, jqXHR) {
                if (that.template_callbacks[template_name]) {
                  _.each(that.template_callbacks[template_name], function(callback) {
                    return callback.render();
                  });
                  that.template_callbacks[template_name] = [];
                }
                if (HR.util && HR.util.ajaxmsg) {
                  HR.util.ajaxmsg("", false, true, 0.001);
                }
                return template_callback = null;
              },
              error: function(jqXHR, textStatus, errorThrown) {
                if (HR.util && HR.util.ajaxmsg) {
                  HR.util.ajaxmsg("Error Occured", false, true, 1);
                }
                throw "Template `" + (that.templatePath("" + template_name + ".js")) + "` Not Found";
                that.template_callbacks[template_name] = [];
                return template_callback = null;
              },
              cache: !HR.development
            });
          }
          if (view_loader) {
            view_loader = this.viewLoader();
          } else {
            view_loader = "<div></div>";
          }
          return _.template(view_loader);
        }
      };

      AppController.prototype.setData = function(key, value) {
        if (this.persistant_data === void 0) {
          this.persistant_data = {};
        }
        if (this.persistant_data[key] === void 0) {
          this.trigger("persistant:set:" + key);
        }
        this.trigger("persistant:change:" + key);
        return this.persistant_data[key] = value;
      };

      AppController.prototype.getData = function(key) {
        if (this.persistant_data && this.persistant_data[key]) {
          return this.persistant_data[key];
        } else {
          return void 0;
        }
      };

      AppController.prototype.viewLoader = function(size) {
        if (size == null) {
          size = 32;
        }
        return "<div class='gray'> <div style='background: url(https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_" + size + "x" + size + ".gif); height: " + size + "px; width: " + size + "px; display: inline-block;'></div> </div>";
      };

      AppController.prototype.setModel = function(data, key, uid, casual) {
        var def_key;
        if (uid == null) {
          uid = null;
        }
        if (casual == null) {
          casual = true;
        }
        def_key = key;
        if (uid) {
          key = "" + key + "-" + uid;
        }
        if (!this.MODELS_DEF[def_key]) {
          throw "HR Error: Model with key `" + key + "` doesn't exist";
        }
        if (!this.MODELS) {
          this.MODELS = {};
        }
        if (!this.MODELS[key]) {
          return this.MODELS[key] = new this.MODELS_DEF[def_key](data, {
            casual: casual
          });
        } else {
          return this.MODELS[key].set(data);
        }
      };

      AppController.prototype.getModel = function(key, uid, callback, fetch, force_fetch, disableThrobber) {
        var model;
        if (uid == null) {
          uid = null;
        }
        if (callback == null) {
          callback = null;
        }
        if (fetch == null) {
          fetch = true;
        }
        if (force_fetch == null) {
          force_fetch = false;
        }
        if (disableThrobber == null) {
          disableThrobber = false;
        }
        model = new this.MODELS_DEF[key](null, {
          casual: false
        });
        if (callback) {
          callback(model);
        }
        if (fetch) {
          model.cached({
            fetch: force_fetch,
            disableThrobber: disableThrobber
          });
        }
        return model;
      };

      AppController.prototype.cleanModelCache = function(keyPrefix) {
        var that;
        that = this;
        return _.each(this.MODELS, function(o, key) {
          if (key.indexOf(keyPrefix) === 0) {
            return delete that.MODELS[key];
          }
        });
      };

      AppController.prototype.setCollection = function(data, key, uid) {
        var def_key;
        if (uid == null) {
          uid = null;
        }
        def_key = key;
        if (uid) {
          key = "" + key + "-" + uid;
        }
        if (!this.COLLECTIONS_DEF[def_key]) {
          throw "HR Error: Collection with key `" + key + "` doesn't exist";
          return {};
        }
        if (!this.COLLECTIONS) {
          this.COLLECTIONS = {};
        }
        if (!this.COLLECTIONS[key]) {
          this.COLLECTIONS[key] = new this.COLLECTIONS_DEF[def_key]();
        }
        return this.COLLECTIONS[key].reset(data, {
          silent: false
        });
      };

      AppController.prototype.getCollection = function(key, uid, callback, fetch, force_fetch, disableThrobber) {
        var cache, collection;
        if (uid == null) {
          uid = null;
        }
        if (callback == null) {
          callback = null;
        }
        if (fetch == null) {
          fetch = true;
        }
        if (force_fetch == null) {
          force_fetch = false;
        }
        if (disableThrobber == null) {
          disableThrobber = false;
        }
        collection = new this.COLLECTIONS_DEF[key](null, {
          casual: !force_fetch
        });
        if (callback) {
          callback(collection);
        }
        if (fetch) {
          cache = !force_fetch;
          collection.cached({
            fetch: force_fetch,
            disableThrobber: disableThrobber
          });
        }
        return collection;
      };

      AppController.prototype.cleanCollectionCache = function(keyPrefix) {
        var that;
        that = this;
        return _.each(this.COLLECTIONS, function(o, key) {
          if (key.indexOf(keyPrefix) === 0) {
            return delete that.COLLECTIONS[key];
          }
        });
      };

      AppController.prototype.setTitle = function(title) {
        return document.title = "" + title + " | HackerRank";
      };

      AppController.prototype.getTemplate = function(template_name, callback, obj) {
        var data, each_inline_template, logical_template_path, that, _i, _len, _ltp, _ref;
        if (callback == null) {
          callback = (function() {});
        }
        if (obj == null) {
          obj = null;
        }
        HR.templates = HR.templates || {};
        logical_template_path = this.logicalTemplatePath(template_name);
        if (obj === null) {
          obj = this;
        }
        if (obj && obj.cid) {
          if (!this.TEMPLATE_VIEWDATA) {
            this.TEMPLATE_VIEWDATA = {};
          }
          if (this.TEMPLATE_VIEWDATA["" + obj.cid + "-" + template_name]) {
            return;
          } else {
            this.TEMPLATE_VIEWDATA["" + obj.cid + "-" + template_name] = true;
          }
        }
        if (this.TEMPLATE_CALLBACKS === void 0) {
          this.TEMPLATE_CALLBACKS = {};
          if ($('script[type="text/template"]').length > 0) {
            _ref = $('script[type="text/template"]');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              each_inline_template = _ref[_i];
              _ltp = this.logicalTemplatePath($(each_inline_template).attr('id'));
              if (!HR.templates[_ltp]) {
                HR.templates[_ltp] = _.template($(each_inline_template).html());
              }
            }
          }
        }
        if (HR.templates[logical_template_path] !== void 0) {
          data = HR.templates[logical_template_path];
          callback.call(obj, data);
          return data;
        } else {
          if (!this.TEMPLATE_CALLBACKS[template_name]) {
            this.TEMPLATE_CALLBACKS[template_name] = [];
            that = this;
            $.ajax({
              url: this.templatePath("" + template_name + ".js"),
              dataType: "script",
              success: function(resp) {
                var _clbk, _results;
                _results = [];
                while (that.TEMPLATE_CALLBACKS[template_name].length > 0) {
                  _clbk = that.TEMPLATE_CALLBACKS[template_name].shift();
                  _results.push(_clbk.callback.call(_clbk.obj, HR.templates[logical_template_path]));
                }
                return _results;
              },
              cache: !HR.development
            });
          }
          this.TEMPLATE_CALLBACKS[template_name].push({
            callback: callback,
            obj: obj
          });
          return null;
        }
      };

      AppController.prototype.clearTemplate = function(template_name) {
        if (this.TEMPLATE_DATA === void 0) {
          this.TEMPLATE_DATA = {};
          this.TEMPLATE_CALLBACKS = {};
        }
        delete this.TEMPLATE_DATA[template_name];
        delete (this.TEMPLATE_VIEWDATA = false);
        return delete this.TEMPLATE_CALLBACKS[template_name];
      };

      AppController.prototype.facebook_login = function(e, callback) {
        var data, h, left, top, w;
        if (e == null) {
          e = null;
        }
        if (callback == null) {
          callback = (function() {});
        }
        if (e) {
          e.preventDefault();
          data = e.data;
          if ($(e.currentTarget).attr("disabled") === "disabled") {
            return;
          }
        } else {
          data = {};
        }
        w = 600;
        h = 350;
        left = (screen.width / 2) - (w / 2);
        top = (screen.height / 2) - (h / 2);
        window.login_callback = function() {
          HR.profile({
            fetch: true
          });
          if (data && data.that && data.destroy) {
            data.that.destroy();
          }
          return callback();
        };
        return window.open("/hackers/auth/facebook?display=popup", "facebook_login", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
      };

      AppController.prototype.github_login = function(e, callback) {
        var data, h, left, top, w;
        if (e == null) {
          e = null;
        }
        if (callback == null) {
          callback = (function() {});
        }
        if (e) {
          e.preventDefault();
          data = e.data;
          if ($(e.currentTarget).attr("disabled") === "disabled") {
            return;
          }
        } else {
          data = {};
        }
        w = 960;
        h = 500;
        left = (screen.width / 2) - (w / 2);
        top = (screen.height / 2) - (h / 2);
        window.login_callback = function() {
          HR.profile({
            fetch: true
          });
          if (data && data.that && data.destroy) {
            data.that.destroy();
          }
          return callback();
        };
        return window.open("/hackers/auth/github?display=popup", "facebook_login", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
      };

      AppController.prototype.facebook_share = function(url, content) {
        var h, left, top, w;
        if (content == null) {
          content = '';
        }
        w = 600;
        h = 350;
        left = (screen.width / 2) - (w / 2);
        top = (screen.height / 2) - (h / 2);
        url = "https://www.facebook.com/sharer.php?s=100&p" + (encodeURIComponent("[url]")) + "=" + (encodeURIComponent(url)) + "&p" + (encodeURIComponent("[title]")) + "=" + window.document.title + "&p" + (encodeURIComponent("[summary]")) + "=" + content;
        window.open(url, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        return window.focus();
      };

      AppController.prototype.twitter_share = function(text) {
        var h, left, top, url, w;
        w = 600;
        h = 350;
        left = (screen.width / 2) - (w / 2);
        top = (screen.height / 2) - (h / 2);
        url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
        window.open(url, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        return window.focus();
      };

      AppController.prototype.querySlug = function(options) {
        var cached_response, prefetch_response;
        if (options == null) {
          options = {};
        }
        HR.QUERY_SLUGS || (HR.QUERY_SLUGS = {});
        cached_response = HR.QUERY_SLUGS[options.slug];
        if (cached_response) {
          options.callback(cached_response);
          return;
        }
        prefetch_response = HR.PREFETCH_DATA.slugs[options.slug];
        if (prefetch_response) {
          options.callback(HR.PREFETCH_DATA.slugs[options.slug]);
          HR.QUERY_SLUGS[options.slug] = HR.PREFETCH_DATA.slugs[options.slug];
          return;
        }
        return $.ajax({
          url: "/rest/query_slug",
          data: {
            slug: options.slug
          },
          success: function(data) {
            HR.QUERY_SLUGS[options.slug] = data;
            return options.callback(data);
          }
        });
      };

      AppController.prototype.slugDetector = function(slug, callback, obj) {
        var data, that;
        if (callback == null) {
          callback = (function() {});
        }
        if (obj == null) {
          obj = null;
        }
        if (obj === null) {
          obj = this;
        }
        if (!this.SLUG_DETECTOR_DATA) {
          this.SLUG_DETECTOR_DATA = {};
          this.SLUG_DETECTOR_CALLBACKS = {};
          if (HR.PREFETCH_DATA["slugs"]) {
            this.SLUG_DETECTOR_DATA = $.extend(HR.PREFETCH_DATA["slugs"], this.SLUG_DETECTOR_DATA);
            _.each(HR.PREFETCH_DATA["slugs"], function(data, slug) {
              return this.SLUG_DETECTOR_DATA[slug].created_at = HR.PREFETCH_DATA["timestamp"] * 1000;
            }, this);
          }
        }
        if (this.SLUG_DETECTOR_DATA[slug] !== void 0) {
          data = this.SLUG_DETECTOR_DATA[slug];
          callback.call(obj, data);
          return data;
        } else {
          if (!this.SLUG_DETECTOR_CALLBACKS[slug]) {
            this.SLUG_DETECTOR_CALLBACKS[slug] = [];
            that = this;
            $.ajax({
              url: "/rest/query_slug",
              type: "POST",
              data: {
                slug: slug
              },
              success: function(resp) {
                var _clbk, _results;
                that.SLUG_DETECTOR_DATA[slug] = resp;
                that.SLUG_DETECTOR_DATA[slug].created_at = (new Date).getTime();
                _results = [];
                while (that.SLUG_DETECTOR_CALLBACKS[slug].length > 0) {
                  _clbk = that.SLUG_DETECTOR_CALLBACKS[slug].shift();
                  _results.push(_clbk.callback.call(_clbk.obj, resp));
                }
                return _results;
              }
            });
          }
          this.SLUG_DETECTOR_CALLBACKS[slug].push({
            callback: callback,
            obj: obj
          });
          return null;
        }
      };

      return AppController;

    })(window.HR.CommonController);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.AppController = AppController;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var GenericModel, HR, _ref;
    GenericModel = (function(_super) {
      __extends(GenericModel, _super);

      function GenericModel() {
        return GenericModel.__super__.constructor.apply(this, arguments);
      }

      GenericModel.prototype.initialize = function(attributes, options) {
        if (attributes == null) {
          attributes = {};
        }
        if (options == null) {
          options = {};
        }
        if (options.casual) {
          this.casual = {};
          this.casual.min_fetch_timelapse = 10 * 1000;
          this.casual.timestamp = new Date().getTime();
        }
        if (!(this.caching != null)) {
          this.caching = true;
        }
        return GenericModel.__super__.initialize.call(this, attributes, options);
      };

      GenericModel.prototype.url = function() {
        return "" + (this.restURL()) + "?" + (this.queryParams());
      };

      GenericModel.prototype.queryParams = function() {
        return "";
      };

      GenericModel.prototype.setCaching = function(caching) {
        this.caching = caching;
      };

      GenericModel.prototype.restPrefix = true;

      GenericModel.prototype.restURL = function() {
        var rest, _url;
        _url = "" + (this.ns(rest = true)) + (this.baseURL());
        return "" + (HR.restURL(_url, this.restPrefix));
      };

      GenericModel.prototype.pageURL = function() {
        return "" + (this.ns()) + (this.baseURL());
      };

      GenericModel.prototype.baseURL = function() {
        return '/dummy';
      };

      GenericModel.prototype.ns = function(rest) {
        if (rest == null) {
          rest = false;
        }
        if (this.collection) {
          this.contest_slug || (this.contest_slug = this.contest_slug || this.get('contest_slug') || this.collection.contest_slug);
        }
        if (!this.contest_slug) {
          this.contest_slug = HR.appController.get_current_contest_slug();
        }
        if (!this.contest_slug) {
          this.contest_slug = "master";
        }
        return HR.namespace(this.contest_slug, rest);
      };

      GenericModel.prototype.hasChanged = function(attr) {
        return GenericModel.__super__.hasChanged.call(this, attr);
      };

      GenericModel.prototype.keyPrefix = function() {
        return HR.profile().get('key_prefix');
      };

      GenericModel.prototype.modelCrumbs = function() {
        var crumbs;
        crumbs = HR.collection('bread-crumbs');
        if (this.id) {
          crumbs.add({
            id: "" + this.constructor.name + "-" + this.id,
            slug: this.get('slug') || this.get('id'),
            path: this.pageURL(),
            name: this.get('name') || this.get('title'),
            model: this
          });
        }
        return crumbs;
      };

      GenericModel.prototype.setContestCrumb = function() {
        var contest, contest_slug;
        contest_slug = this.contest_slug || this.get('contest-slug');
        if (contest_slug) {
          return contest = HR.model('contest', {
            slug: this.contest_slug
          }).cached({
            success: (function(_this) {
              return function(model) {
                return _this.crumbs.merge(model.breadCrumbs(), {
                  at: 0
                });
              };
            })(this)
          });
        }
      };

      GenericModel.prototype.breadCrumbs = function() {
        if (!this.crumbs) {
          this.crumbs = HR.collection('bread-crumbs');
          this.setContestCrumb();
        }
        this.crumbs.merge(this.modelCrumbs());
        return this.crumbs;
      };

      GenericModel.prototype.save = function(key, val, options) {
        if (this.id && this.caching) {
          this.cacheSet(key, val, options);
        }
        if (this.collection) {
          this.collection.flush();
        }
        return Backbone.Model.prototype.save.apply(this, arguments);
      };

      GenericModel.prototype.fetch = function(options) {
        if (this.disableThrobber === void 0 || this.disableThrobber !== true) {
          if (HR.util && HR.util.ajaxmsg) {
            HR.util.ajaxmsg("Loading...", false, true, 1000);
          }
        } else {
          this.disableThrobber = false;
        }
        return Backbone.Model.prototype.fetch.apply(this, arguments);
      };

      GenericModel.prototype.parse = function(resp, xhr) {
        var f, parsed, set_data_fields, that, _fn, _i, _len;
        if (xhr !== void 0 || resp.model) {
          this.sync_status = true;
          if (this.disableThrobber === void 0 || this.disableThrobber !== true) {
            if (HR.util && HR.util.ajaxmsg) {
              HR.util.ajaxmsg("", false, true, 0);
            }
          } else {
            this.disableThrobber = false;
          }
          set_data_fields = ['total', 'page', 'activities', 'gamedata', 'status', 'metadata', 'errors'];
          that = this;
          _fn = function(f) {
            if (resp[f] !== void 0) {
              return that[f] = resp[f];
            }
          };
          for (_i = 0, _len = set_data_fields.length; _i < _len; _i++) {
            f = set_data_fields[_i];
            _fn(f);
          }
          parsed = GenericModel.__super__.parse.call(this, resp.model, xhr);
        } else {
          parsed = GenericModel.__super__.parse.call(this, resp, xhr);
        }
        return parsed;
      };

      return GenericModel;

    })(Backbone.Model);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.GenericModel = GenericModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ABTest, HR;
    ABTest = (function(_super) {
      __extends(ABTest, _super);

      function ABTest() {
        return ABTest.__super__.constructor.apply(this, arguments);
      }

      ABTest.prototype.url = function() {
        return "/rest/ab_testing/" + this.test;
      };

      ABTest.prototype.updateStatus = function(status) {
        this.set('status', status);
        this.save();
        return this;
      };

      return ABTest;

    })(Backbone.Model);
    HR = window.HR;
    return HR.ABTest = ABTest;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var AnswerModel, HR;
    AnswerModel = (function(_super) {
      __extends(AnswerModel, _super);

      function AnswerModel() {
        return AnswerModel.__super__.constructor.apply(this, arguments);
      }

      AnswerModel.prototype.baseURL = function() {
        if (this.id) {
          return "challenges/" + (this.get('challenge_slug')) + "/questions/" + (this.get('question_id')) + "/answers/" + this.id;
        } else {
          return "challenges/" + (this.get('challenge_slug')) + "/questions/" + (this.get('question_id')) + "/answers";
        }
      };

      AnswerModel.prototype.getCreatedAt = function() {
        return this.created_at;
      };

      return AnswerModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.AnswerModel = AnswerModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var BlogModel, HR;
    BlogModel = (function(_super) {
      __extends(BlogModel, _super);

      function BlogModel() {
        return BlogModel.__super__.constructor.apply(this, arguments);
      }

      BlogModel.prototype.url = function() {
        return "/rest/blogs/" + (this.get('id'));
      };

      return BlogModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.BlogModel = BlogModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var BlogTemplateModel, HR;
    BlogTemplateModel = (function(_super) {
      __extends(BlogTemplateModel, _super);

      function BlogTemplateModel() {
        return BlogTemplateModel.__super__.constructor.apply(this, arguments);
      }

      return BlogTemplateModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.BlogTemplateModel = BlogTemplateModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var BreadCrumbModel, HR;
    BreadCrumbModel = (function(_super) {
      __extends(BreadCrumbModel, _super);

      function BreadCrumbModel() {
        return BreadCrumbModel.__super__.constructor.apply(this, arguments);
      }

      BreadCrumbModel.prototype.cacheTimeout = 5 * 60;

      return BreadCrumbModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.BreadCrumbModel = BreadCrumbModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var BroadcastModel, HR;
    BroadcastModel = (function(_super) {
      __extends(BroadcastModel, _super);

      function BroadcastModel() {
        return BroadcastModel.__super__.constructor.apply(this, arguments);
      }

      BroadcastModel.prototype.restURL = function() {
        var path;
        if (_.isNumber(this.id)) {
          return path = "rest/administration/broadcasts/" + this.id;
        } else {
          return path = "rest/administration/broadcasts/";
        }
      };

      return BroadcastModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.BroadcastModel = BroadcastModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var CategoryModel, HR;
    CategoryModel = (function(_super) {
      __extends(CategoryModel, _super);

      function CategoryModel() {
        return CategoryModel.__super__.constructor.apply(this, arguments);
      }

      CategoryModel.prototype.children = function() {
        if (!this._children) {
          this._children = HR.collection('category');
          if (_.isArray(this.get('children'))) {
            this._children.set(this.get('children'));
            this._children.each((function(_this) {
              return function(child) {
                return child.parent = _this;
              };
            })(this));
          }
        }
        return this._children;
      };

      CategoryModel.prototype.baseURL = function() {
        var path;
        path = "categories";
        if (this.parent) {
          path += "/" + (this.parent.get('slug'));
        }
        return path += "/" + (this.get('slug'));
      };

      CategoryModel.prototype.defaultHierarchy = function() {
        var children, firstChild;
        children = HR.collection('category', [this]);
        firstChild = this.children().first();
        if (firstChild) {
          children.merge(firstChild.defaultHierarchy());
        }
        return children;
      };

      return CategoryModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.CategoryModel = CategoryModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ChallengeModel, ChallengeStats, HR;
    ChallengeModel = (function(_super) {
      __extends(ChallengeModel, _super);

      function ChallengeModel() {
        return ChallengeModel.__super__.constructor.apply(this, arguments);
      }

      ChallengeModel.prototype.baseURL = function() {
        return "challenges/" + (this.get('slug'));
      };

      ChallengeModel.prototype.setSlug = function(slug) {
        return this.set('slug', slug);
      };

      ChallengeModel.prototype.showLoader = false;

      ChallengeModel.prototype.custom_messages = {
        not_started: 'The challenge is not available yet. It begins'
      };

      ChallengeModel.prototype.categories = function() {
        return HR.collection('category', this.get('categories') || []);
      };

      ChallengeModel.prototype.getLanguageTemplates = function() {
        var response, _data;
        _data = this.get('_data');
        response = {
          lang_head_template: {},
          lang_template: {},
          lang_tail_template: {}
        };
        _.each(_data, function(v, k) {
          if (k.endsWith("_template")) {
            return response.lang_template[k.substring(0, k.length - "_template".length)] = v;
          } else if (k.endsWith("_template_head")) {
            return response.lang_head_template[k.substring(0, k.length - "_template_head".length)] = v;
          } else if (k.endsWith("_template_tail")) {
            return response.lang_tail_template[k.substring(0, k.length - "_template_tail".length)] = v;
          }
        });
        return response;
      };

      ChallengeModel.prototype.modelCrumbs = function() {
        var crumbs, parent, track;
        crumbs = HR.collection('bread-crumbs');
        track = this.get('track');
        parent = null;
        this.categories().each(function(category) {
          category.parent = parent;
          crumbs.add({
            id: "Category-" + category.id,
            slug: category.get('slug'),
            name: category.get('name'),
            path: category.pageURL()
          });
          return parent = category;
        });
        crumbs.merge(ChallengeModel.__super__.modelCrumbs.call(this));
        return crumbs;
      };

      ChallengeModel.prototype.timerStep = function() {
        var maxStep;
        maxStep = Math.min(Math.ceil(this.get('time_left') / 60), 600);
        return Math.max(1, maxStep);
      };

      ChallengeModel.prototype.onTimer = function(iteration) {
        var time_left;
        time_left = this.get('time_left') - this.getTimerStep();
        if (time_left >= 0) {
          this.set('time_left', time_left);
          return this.cacheSet();
        } else {
          (this.collection || this).cachedFetch();
          return this.stopTimer();
        }
      };

      ChallengeModel.prototype.nextMilestone = function() {
        var time_left;
        time_left = this.get('time_left');
        if (time_left) {
          this.startTimer();
          return new Date($.now() + time_left * 1000);
        } else {
          this.stopTimer();
          return "";
        }
      };

      ChallengeModel.prototype.started = function() {
        return this.get('has_started');
      };

      ChallengeModel.prototype.ended = function() {
        return this.get('has_ended');
      };

      return ChallengeModel;

    })(window.HR.GenericModel);
    ChallengeStats = (function(_super) {
      __extends(ChallengeStats, _super);

      function ChallengeStats() {
        return ChallengeStats.__super__.constructor.apply(this, arguments);
      }

      return ChallengeStats;

    })(window.HR.GenericModel);
    HR = window.HR;
    HR.ChallengeModel = ChallengeModel;
    return HR.ChallengeStats = ChallengeStats;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ChecklistModel, HR;
    ChecklistModel = (function(_super) {
      __extends(ChecklistModel, _super);

      function ChecklistModel() {
        return ChecklistModel.__super__.constructor.apply(this, arguments);
      }

      return ChecklistModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.ChecklistModel = ChecklistModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var CompileTestModel, HR, _ref;
    CompileTestModel = (function(_super) {
      __extends(CompileTestModel, _super);

      function CompileTestModel() {
        return CompileTestModel.__super__.constructor.apply(this, arguments);
      }

      CompileTestModel.prototype.url = function() {
        var url;
        url = "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/challenges/" + (this.challenge.get('slug')) + "/compile_tests";
        if (this.get('id')) {
          url += "/" + (this.get('id'));
        }
        return url;
      };

      CompileTestModel.prototype.setChallenge = function(challenge) {
        this.challenge = challenge;
      };

      CompileTestModel.prototype.initialize = function(options) {
        var that;
        that = this;
        this.time = 1500;
        return this.throttledFetch = _.throttle(function() {
          return that.fetch({
            disable_throbber: true,
            success: function(model) {
              return model.trigger("reset");
            }
          });
        }, this.time - 50);
      };

      CompileTestModel.prototype.parse = function(resp, xhr) {
        var that;
        if (!resp.status) {
          return CompileTestModel.__super__.parse.call(this, {
            model: {
              status: 2,
              error: resp.message
            }
          }, xhr);
        }
        that = this;
        if (!xhr) {
          return CompileTestModel.__super__.parse.call(this, resp, xhr);
        }
        if (resp.status && resp.model.status === 0) {
          setTimeout(function() {
            return that.throttledFetch();
          }, this.time);
        }
        return CompileTestModel.__super__.parse.call(this, resp, xhr);
      };

      return CompileTestModel;

    })(window.HR.GenericModel);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.CompileTestModel = CompileTestModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ContestAccessModel, HR;
    ContestAccessModel = (function(_super) {
      __extends(ContestAccessModel, _super);

      function ContestAccessModel() {
        return ContestAccessModel.__super__.constructor.apply(this, arguments);
      }

      ContestAccessModel.prototype.url = function() {
        if (this.id) {
          return "/rest/contests/" + this.contest_id + "/contestaccesses/" + this.id;
        } else {
          return "/rest/contests/" + this.contest_id + "/contestaccesses/";
        }
      };

      ContestAccessModel.prototype.setContestId = function(contest_id) {
        this.contest_id = contest_id;
      };

      return ContestAccessModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.ContestAccessModel = ContestAccessModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ContestModel, HR;
    ContestModel = (function(_super) {
      __extends(ContestModel, _super);

      function ContestModel() {
        return ContestModel.__super__.constructor.apply(this, arguments);
      }

      ContestModel.prototype.custom_messages = {};

      ContestModel.prototype.baseURL = function() {
        var identifier;
        identifier = this.get('slug') || HR.master;
        if (identifier === "master" && this.get("id") && parseInt(this.get("id")) !== 1) {
          identifier = this.get('id');
        }
        return "contests/" + identifier;
      };

      ContestModel.prototype.pageURL = function() {
        var base;
        base = ContestModel.__super__.pageURL.call(this);
        return "" + base + "/challenges";
      };

      ContestModel.prototype.ns = function() {
        return "/";
      };

      ContestModel.prototype.getTrack = function(track_slug) {
        var track;
        track = _.select(this.get('primary_tags') || [], function(tag) {
          return tag.slug === track_slug;
        });
        return _.first(track);
      };

      ContestModel.prototype.keyPrefix = function() {
        if (!(this.id && this.get('slug')) || this.isMaster()) {
          return '';
        } else {
          return ContestModel.__super__.keyPrefix.call(this);
        }
      };

      ContestModel.prototype.isMaster = function() {
        return this.get('slug') === HR.master;
      };

      ContestModel.prototype.getRemainingTime = function() {
        var hours, minutes;
        hours = Math.floor(this.get('time_left') / 3600);
        minutes = Math.ceil((this.get('time_left') - hours * 3600) / 60);
        return [hours, minutes];
      };

      ContestModel.prototype.timerStep = function() {
        var maxStep;
        maxStep = Math.min(Math.ceil(this.get('time_left') / 60), 600);
        return Math.max(1, maxStep);
      };

      ContestModel.prototype.onTimer = function(iteration) {
        var time_left;
        time_left = this.get('time_left') - this.getTimerStep();
        if (time_left >= 0) {
          this.set('time_left', time_left);
          return this.cacheSet();
        } else {
          (this.collection || this).cachedFetch();
          return this.stopTimer();
        }
      };

      ContestModel.prototype.nextMilestone = function() {
        var time_left;
        time_left = this.get('time_left');
        if (time_left) {
          this.startTimer();
          return new Date($.now() + time_left * 1000);
        } else {
          this.stopTimer();
          return "";
        }
      };

      ContestModel.prototype.modelCrumbs = function() {
        var crumbs, slug;
        slug = this.get('slug') || this.slug;
        if (this.isMaster()) {
          crumbs = HR.collection('bread-crumbs');
        } else {
          crumbs = ContestModel.__super__.modelCrumbs.call(this);
          crumbs.add({
            id: 'contests',
            name: 'Contests',
            slug: 'contests',
            path: '/contests'
          }, {
            at: 0
          });
        }
        return crumbs;
      };

      ContestModel.prototype.categories = function() {
        var categories;
        return categories = HR.collection('category', this.get('categories') || []);
      };

      ContestModel.prototype.currentCategories = function(category_slugs, autoFillMissing) {
        var categories, currentCategories;
        if (autoFillMissing == null) {
          autoFillMissing = false;
        }
        if (category_slugs) {
          categories = this.categories();
          currentCategories = HR.collection('category');
          _.each(category_slugs, (function(_this) {
            return function(category_slug) {
              var category;
              category = categories.findWhere({
                "slug": category_slug
              });
              currentCategories.add(category);
              if (category) {
                return categories = category.children();
              } else if (categories.first() && categories.first().children()) {
                return categories = categories.first().children();
              }
            };
          })(this));
          if (autoFillMissing) {
            currentCategories = currentCategories.defaultHierarchy();
          }
        } else {
          currentCategories = this.categories().defaultHierarchy();
        }
        return currentCategories;
      };

      ContestModel.prototype.tracks = function() {
        var tracks;
        return tracks = HR.collection('track', this.get('categories') || []);
      };

      ContestModel.prototype.currentTracks = function(track_slugs, autoFillMissing) {
        var currentTracks, tracks;
        if (autoFillMissing == null) {
          autoFillMissing = false;
        }
        if (track_slugs) {
          tracks = this.tracks();
          currentTracks = HR.collection('track');
          _.each(track_slugs, (function(_this) {
            return function(track_slug) {
              var track;
              track = tracks.findWhere({
                "slug": track_slug
              });
              currentTracks.add(track);
              if (track) {
                return tracks = track.children();
              } else if (tracks.first() && tracks.first().children()) {
                return tracks = tracks.first().children();
              }
            };
          })(this));
          if (autoFillMissing) {
            currentTracks = currentTracks.defaultHierarchy();
          }
        } else {
          currentTracks = this.tracks().defaultHierarchy();
        }
        return currentTracks;
      };

      ContestModel.prototype.breadCrumbs = function() {
        return this.modelCrumbs();
      };

      ContestModel.prototype.cacheTimeout = 30;

      ContestModel.prototype.running = function() {
        return this.started() && !this.ended();
      };

      ContestModel.prototype.upcoming = function() {
        return !this.started();
      };

      ContestModel.prototype.started = function() {
        return this.get('started');
      };

      ContestModel.prototype.ended = function() {
        return this.get('ended');
      };

      ContestModel.prototype.setSlug = function(slug) {
        return this.set('slug', slug);
      };

      ContestModel.prototype.setContestBroadcast = function() {
        if (this.get('contest_message')) {
          $("#contestwide-broadcast").html(this.get('contest_message'));
          return $("#contestwide-broadcast").addClass("banner");
        }
      };

      ContestModel.prototype.unSetContestBroadcast = function() {
        $("#contestwide-broadcast").html("");
        return $("#contestwide-broadcast").removeClass("banner");
      };

      return ContestModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.ContestModel = ContestModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var DashboardHistory, DashboardModel, DashboardProgressModel, HR, _ref;
    DashboardModel = (function(_super) {
      __extends(DashboardModel, _super);

      function DashboardModel() {
        return DashboardModel.__super__.constructor.apply(this, arguments);
      }

      DashboardModel.prototype.restPrefix = false;

      DashboardModel.prototype.baseURL = function() {
        return "dashboard";
      };

      DashboardModel.prototype.restURL = function() {
        var rest, _url;
        _url = "/rest" + (this.ns(rest = true)) + (this.baseURL());
        return "" + (HR.restURL(_url, this.restPrefix));
      };

      return DashboardModel;

    })(window.HR.GenericModel);
    DashboardHistory = (function(_super) {
      __extends(DashboardHistory, _super);

      function DashboardHistory() {
        return DashboardHistory.__super__.constructor.apply(this, arguments);
      }

      return DashboardHistory;

    })(window.HR.GenericModel);
    DashboardProgressModel = (function(_super) {
      __extends(DashboardProgressModel, _super);

      function DashboardProgressModel() {
        return DashboardProgressModel.__super__.constructor.apply(this, arguments);
      }

      DashboardProgressModel.prototype.baseURL = function() {
        return "dashboard/progress";
      };

      DashboardProgressModel.prototype.restURL = function() {
        var rest, _url;
        _url = "/rest" + (this.ns(rest = true)) + (this.baseURL());
        return "" + (HR.restURL(_url, this.restPrefix));
      };

      DashboardProgressModel.prototype.restPrefix = false;

      DashboardProgressModel.prototype.tracks = function() {
        return HR.collection('dashboard-progress', this.get('tracks') || []);
      };

      DashboardProgressModel.prototype.completion = function() {
        return ((this.get('completed') / this.get('total')) * 100).round();
      };

      DashboardProgressModel.prototype.stats = function(track_id) {
        var model;
        model = this.tracks().get(track_id) || this;
        return {
          category: model.get('category'),
          completed: model.get('completed'),
          completion: model.completion(),
          total: model.get('total'),
          languages: model.languagesDisplay()
        };
      };

      DashboardProgressModel.prototype.languagesDisplay = function() {
        var languages;
        return languages = _.map(this.get('languages'), (function(_this) {
          return function(language) {
            return lang_display_mapping[language] || language;
          };
        })(this));
      };

      return DashboardProgressModel;

    })(window.HR.GenericModel);
    HR = (_ref = window.HR) != null ? _ref : {};
    HR.DashboardModel = DashboardModel;
    HR.DashboardHistory = DashboardHistory;
    return HR.DashboardProgressModel = DashboardProgressModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var EditorialModel, HR;
    EditorialModel = (function(_super) {
      __extends(EditorialModel, _super);

      function EditorialModel() {
        return EditorialModel.__super__.constructor.apply(this, arguments);
      }

      EditorialModel.prototype.baseURL = function() {
        return "challenges/" + (this.get('challenge_slug')) + "/editorial";
      };

      return EditorialModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.EditorialModel = EditorialModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var EmailPreferencesModel, HR;
    EmailPreferencesModel = (function(_super) {
      __extends(EmailPreferencesModel, _super);

      function EmailPreferencesModel() {
        return EmailPreferencesModel.__super__.constructor.apply(this, arguments);
      }

      EmailPreferencesModel.prototype.url = function() {
        var username;
        username = this.username || this.get('username');
        if (username) {
          return "/rest/hackers/" + username + "/email_preferences";
        }
      };

      EmailPreferencesModel.prototype.setUsername = function(username) {
        this.username = username;
      };

      EmailPreferencesModel.prototype.metaKeys = ["metadata", "status"];

      return EmailPreferencesModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.EmailPreferencesModel = EmailPreferencesModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var GameModel, HR, _ref;
    GameModel = (function(_super) {
      __extends(GameModel, _super);

      function GameModel() {
        return GameModel.__super__.constructor.apply(this, arguments);
      }

      GameModel.prototype.url = function() {
        var id;
        id = this.get('id');
        if (this.contest_slug) {
          return "/rest/contests/" + this.contest_slug + "/games/" + id;
        } else {
          return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/games/" + id;
        }
      };

      return GameModel;

    })(window.HR.GenericModel);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.GameModel = GameModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var GameSetModel, HR, _ref;
    GameSetModel = (function(_super) {
      __extends(GameSetModel, _super);

      function GameSetModel() {
        return GameSetModel.__super__.constructor.apply(this, arguments);
      }

      GameSetModel.prototype.url = function() {
        var i, num_players, players, tag, _i, _ref;
        num_players = this.get('num_players');
        players = [];
        for (i = _i = 1, _ref = num_players + 1; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
          players[i - 1] = this.get("player" + i);
        }
        players.sort(function(a, b) {
          return a - b;
        });
        tag = players.join("-");
        if (this.contest_slug) {
          return "/rest/contests/" + this.contest_slug + "/gamesets/" + tag;
        } else {
          return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/gamesets/" + tag;
        }
      };

      GameSetModel.prototype.parse = function(resp, xhr) {
        var _models;
        if (xhr) {
          if (resp.model.length > 0) {
            _models = resp.model[0].games;
            this.set(resp.model[0]);
          } else {
            _models = resp.model.games;
          }
        } else {
          _models = resp.games;
        }
        this.genGameCollection(_models);
        return GameSetModel.__super__.parse.call(this, resp, xhr);
      };

      GameSetModel.prototype.genGameCollection = function(_models) {
        if (_models == null) {
          _models = null;
        }
        if (_models === null) {
          _models = this.get('games');
        }
        this.game_collection = new HR.GameCollection;
        return _.each(_models, function(_model) {
          var model;
          if (!(this.game_collection.get(_model.id) && this.game_collection.get(_model.id).get('updated_at') === _model.updated_at)) {
            if (this.game_collection.get(_model.id)) {
              model = this.game_collection.get(_model.id);
              model.set(_model);
              return model.sync_status = true;
            } else {
              model = new HR.GameModel(_model);
              model.sync_status = true;
              return this.game_collection.add(model);
            }
          }
        }, this);
      };

      GameSetModel.prototype.getGameCollection = function() {
        if (!this.game_collection) {
          this.genGameCollection();
        }
        return this.game_collection;
      };

      GameSetModel.prototype.add = function(gameModel) {
        if (!this.game_collection) {
          this.game_collection = new HR.GameCollection;
        }
        gameModel.sync_status = true;
        return this.game_collection.add(gameModel);
      };

      return GameSetModel;

    })(window.HR.GenericModel);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.GameSetModel = GameSetModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerApplicationModel;
    HackerApplicationModel = (function(_super) {
      __extends(HackerApplicationModel, _super);

      function HackerApplicationModel() {
        return HackerApplicationModel.__super__.constructor.apply(this, arguments);
      }

      HackerApplicationModel.prototype.url = function() {
        var id;
        if (this.id || this.get("id")) {
          id = this.id ? this.id : this.get("id");
          return "/rest/contests/" + this.contest_slug + "/hackerapplications/" + id;
        } else {
          return "/rest/contests/" + this.contest_slug + "/hackerapplications";
        }
      };

      HackerApplicationModel.prototype.setId = function(id) {
        this.id = id;
      };

      return HackerApplicationModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.HackerApplicationModel = HackerApplicationModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerChallengeModel;
    HackerChallengeModel = (function(_super) {
      __extends(HackerChallengeModel, _super);

      function HackerChallengeModel() {
        return HackerChallengeModel.__super__.constructor.apply(this, arguments);
      }

      HackerChallengeModel.prototype.url = function() {
        if (this.filter) {
          return "/rest/contests/" + this.contest.id + "/hackers/" + this.hackerId + "/challenges/submissions?challenge_id=" + this.id + "&" + this.filter;
        } else {
          return "/rest/contests/" + this.contest.id + "/hackers/" + this.hackerId + "/challenges/submissions?challenge_id=" + this.id + "&key=" + this.key;
        }
      };

      HackerChallengeModel.prototype.setId = function(id) {
        this.id = id;
      };

      HackerChallengeModel.prototype.setFilterString = function(filter) {
        this.filter = filter;
      };

      HackerChallengeModel.prototype.setHackerId = function(hackerId) {
        this.hackerId = hackerId;
      };

      HackerChallengeModel.prototype.setKey = function(key) {
        this.key = key;
      };

      HackerChallengeModel.prototype.setContest = function(contest) {
        this.contest = contest;
      };

      HackerChallengeModel.prototype.parse = function(resp, xhr) {
        if (resp.model) {
          _.each(resp.model, (function(_this) {
            return function(val, key) {
              if (val === null || val === "null") {
                return resp.model[key] = "";
              }
            };
          })(this));
          resp.model;
        } else {
          _.each(resp, (function(_this) {
            return function(val, key) {
              if (val === null || val === "null") {
                return resp[key] = "";
              }
            };
          })(this));
        }
        return HackerChallengeModel.__super__.parse.call(this, resp, xhr);
      };

      return HackerChallengeModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.HackerChallengeModel = HackerChallengeModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerHackosModel;
    HackerHackosModel = (function(_super) {
      __extends(HackerHackosModel, _super);

      function HackerHackosModel() {
        return HackerHackosModel.__super__.constructor.apply(this, arguments);
      }

      HackerHackosModel.prototype.showLoader = true;

      return HackerHackosModel;

    })(window.HR.GenericModel);
    HR = window.HR || {};
    return HR.HackerHackosModel = HackerHackosModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerMerge;
    HackerMerge = (function(_super) {
      __extends(HackerMerge, _super);

      function HackerMerge() {
        return HackerMerge.__super__.constructor.apply(this, arguments);
      }

      HackerMerge.prototype.urlRoot = "/rest/hacker_merges/";

      return HackerMerge;

    })(Backbone.Model);
    HR = window.HR;
    return HR.HackerMerge = HackerMerge;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerProfileModel;
    HackerProfileModel = (function(_super) {
      __extends(HackerProfileModel, _super);

      function HackerProfileModel() {
        return HackerProfileModel.__super__.constructor.apply(this, arguments);
      }

      HackerProfileModel.prototype.url = function() {
        return "/rest/contests/master/hackers/" + this.id + "/profile";
      };

      HackerProfileModel.prototype.idAttribute = "username";

      HackerProfileModel.prototype.showLoader = false;

      HackerProfileModel.prototype.follow = function(callback) {
        var that;
        that = this;
        return $.ajax({
          url: "/rest/profile/follow",
          data: {
            hacker: this.username()
          },
          type: "PUT",
          success: function(data) {
            return callback(data);
          }
        });
      };

      HackerProfileModel.prototype.unfollow = function(callback) {
        return $.ajax({
          url: "/rest/profile/unfollow",
          data: {
            hacker: this.username()
          },
          type: "PUT",
          success: function(data) {
            return callback(data);
          }
        });
      };

      HackerProfileModel.prototype.fetchScores = function() {
        var that;
        that = this;
        that.set('scores', {});
        return $.ajax({
          url: "/rest/hackers/" + (this.get('username')) + "/scores",
          success: function(data) {
            var obj;
            obj = {};
            _.each(data, function(x) {
              obj[x.name] = x;
              return obj[x.slug] = x;
            });
            that.set('scores', obj);
            return that.trigger('reset');
          }
        });
      };

      return HackerProfileModel;

    })(window.HR.GenericModel);
    HR = window.HR || {};
    return HR.HackerProfileModel = HackerProfileModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerProgressModel;
    HackerProgressModel = (function(_super) {
      __extends(HackerProgressModel, _super);

      function HackerProgressModel() {
        return HackerProgressModel.__super__.constructor.apply(this, arguments);
      }

      HackerProgressModel.prototype.url = function() {
        if (this.track_id) {
          return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/mods/" + this.mod_id + "/tracks/" + this.type_id + "/progress_history";
        } else if (this.mod_id) {
          return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/mods/" + this.mod_id + "/progress_history";
        } else {
          return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/progress_history";
        }
      };

      HackerProgressModel.prototype.setModule = function(mod_id) {
        this.mod_id = mod_id;
      };

      HackerProgressModel.prototype.setTrack = function(track_id) {
        this.track_id = track_id;
      };

      HackerProgressModel.prototype.parse = function(resp, xhr) {
        return HackerProgressModel.__super__.parse.call(this, resp, xhr);
      };

      return HackerProgressModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.HackerProgressModel = HackerProgressModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, LeaderboardModel;
    LeaderboardModel = (function(_super) {
      __extends(LeaderboardModel, _super);

      function LeaderboardModel() {
        return LeaderboardModel.__super__.constructor.apply(this, arguments);
      }

      return LeaderboardModel;

    })(window.HR.GenericModel);
    HR = window.HR || {};
    return HR.LeaderboardModel = LeaderboardModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, MailTemplateModel, _ref;
    MailTemplateModel = (function(_super) {
      __extends(MailTemplateModel, _super);

      function MailTemplateModel() {
        return MailTemplateModel.__super__.constructor.apply(this, arguments);
      }

      MailTemplateModel.prototype.initialize = function(options) {
        this.sample = options.sample;
        this.contest_id = options.contest_id;
        return this.hacker_id = options.hacker_id;
      };

      MailTemplateModel.prototype.queryParams = function() {
        var queryString;
        queryString = "";
        if (_.isNumber(this.contest_id) && this.contest_id >= 1) {
          queryString += "contest_id=" + this.contest_id;
          if (_.isNumber(this.hacker_id) && this.hacker_id >= 1) {
            queryString += "&";
          }
        }
        if (_.isNumber(this.hacker_id) && this.hacker_id >= 1) {
          queryString += "hacker_id=" + this.hacker_id;
        }
        return queryString;
      };

      MailTemplateModel.prototype.restURL = function() {
        var path;
        if (this.id) {
          path = "rest/administration/mails/templates/" + this.id;
        } else {
          path = "rest/administration/mails/templates/1";
        }
        if (this.sample === true) {
          return path += "/sample";
        }
      };

      return MailTemplateModel;

    })(window.HR.GenericModel);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.MailTemplateModel = MailTemplateModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ChallengeAssociationModel, HR;
    ChallengeAssociationModel = (function(_super) {
      __extends(ChallengeAssociationModel, _super);

      function ChallengeAssociationModel() {
        return ChallengeAssociationModel.__super__.constructor.apply(this, arguments);
      }

      ChallengeAssociationModel.prototype.defaults = function() {
        var attr;
        attr = {
          challenge: {
            name: ""
          },
          priority: 0,
          weight: 100,
          mod_id: "",
          track_id: "",
          dynamic: false
        };
        return attr;
      };

      ChallengeAssociationModel.prototype.save = function() {
        return Backbone.Model.prototype.save.apply(this, arguments);
      };

      ChallengeAssociationModel.prototype.set = function(attributes, options) {
        return ChallengeAssociationModel.__super__.set.call(this, attributes, options);
      };

      ChallengeAssociationModel.prototype.url = function() {
        if (this.id && !this.isNew()) {
          return "/rest/contests/" + this.contestId + "/challengeassociations/" + this.id;
        } else if (this.contestId) {
          return "/rest/contests/" + this.contestId + "/challengeassociations/";
        } else {
          return "/rest/contests/" + (this.get('contest_id')) + "/challengeassociations/";
        }
      };

      ChallengeAssociationModel.prototype.setId = function(id) {
        this.id = id;
      };

      return ChallengeAssociationModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.ChallengeAssociationModel = ChallengeAssociationModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, Manage_ChallengeModel;
    Manage_ChallengeModel = (function(_super) {
      __extends(Manage_ChallengeModel, _super);

      function Manage_ChallengeModel() {
        return Manage_ChallengeModel.__super__.constructor.apply(this, arguments);
      }

      Manage_ChallengeModel.prototype.defaults = function() {
        var attr;
        attr = {
          name: "",
          slug: "",
          preview: "",
          body: "",
          kind: "",
          _data: {},
          submit_disabled: false
        };
        return attr;
      };

      Manage_ChallengeModel.prototype.url = function() {
        var id;
        if (this.id) {
          id = this.id;
          return "/manage/challenges/" + id + "?all=true";
        } else {
          return "/manage/challenges";
        }
      };

      Manage_ChallengeModel.prototype.setId = function(id) {
        this.id = id;
      };

      Manage_ChallengeModel.prototype.parse = function(resp, xhr) {
        if (resp.model) {
          _.each(resp.model, (function(_this) {
            return function(val, key) {
              if (val === null || val === "null") {
                return resp.model[key] = "";
              }
            };
          })(this));
          resp.model;
        } else {
          _.each(resp, (function(_this) {
            return function(val, key) {
              if (val === null || val === "null") {
                return resp[key] = "";
              }
            };
          })(this));
        }
        return Manage_ChallengeModel.__super__.parse.call(this, resp, xhr);
      };

      return Manage_ChallengeModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Manage_ChallengeModel = Manage_ChallengeModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, Manage_ContestModel;
    Manage_ContestModel = (function(_super) {
      __extends(Manage_ContestModel, _super);

      function Manage_ContestModel() {
        return Manage_ContestModel.__super__.constructor.apply(this, arguments);
      }

      Manage_ContestModel.prototype.defaults = function() {
        var attr;
        attr = {
          name: "",
          slug: "",
          description: "",
          challenge_placeholder_template: "",
          notification: [],
          epoch_starttime: (new Date).getTime(),
          epoch_endtime: (new Date).getTime() + (24 * 60 * 60 * 1000),
          scoring_template: "",
          faq_template: "",
          homepage: "",
          cutoff_score: 0,
          starttime: "",
          endtime: "",
          homepage_background_color: "",
          homepage_background_image: "",
          tagline: "",
          "public": false,
          prizes: "",
          enable_olark: false,
          submit_disabled: false,
          hacker_application: false
        };
        return attr;
      };

      Manage_ContestModel.prototype.set = function(attributes, options) {
        return Manage_ContestModel.__super__.set.call(this, attributes, options);
      };

      Manage_ContestModel.prototype.url = function() {
        if (this.id) {
          return "/rest/contests/" + this.id + "?all=true";
        } else {
          return "/rest/contests";
        }
      };

      Manage_ContestModel.prototype.setId = function(id) {
        this.id = id;
        return this;
      };

      Manage_ContestModel.prototype.parse = function(resp, xhr) {
        var offset;
        offset = (new Date()).getTimezoneOffset() * 60 * 1000;
        if (resp.model) {
          if (resp.model.epoch_starttime) {
            if (resp.model.epoch_starttime !== null) {
              resp.model.epoch_starttime = (resp.model.epoch_starttime * 1000) + offset;
            }
            if (resp.model.epoch_endtime !== null) {
              resp.model.epoch_endtime = resp.model.epoch_endtime * 1000 + offset;
            }
          }
          _.each(resp.model, (function(_this) {
            return function(val, key) {
              if (val === null || val === "null") {
                return resp.model[key] = "";
              }
            };
          })(this));
        } else {
          _.each(resp, (function(_this) {
            return function(val, key) {
              if (val === null || val === "null") {
                return resp[key] = "";
              }
            };
          })(this));
        }
        return Manage_ContestModel.__super__.parse.call(this, resp, xhr);
      };

      return Manage_ContestModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Manage_ContestModel = Manage_ContestModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, Manage_NotificationModel;
    Manage_NotificationModel = (function(_super) {
      __extends(Manage_NotificationModel, _super);

      function Manage_NotificationModel() {
        return Manage_NotificationModel.__super__.constructor.apply(this, arguments);
      }

      Manage_NotificationModel.prototype.initialize = function(attributes, options) {
        if (attributes == null) {
          attributes = {};
        }
        if (options == null) {
          options = {};
        }
        _.extend(this.attributes, attributes);
        return Manage_NotificationModel.__super__.initialize.call(this, attributes, options);
      };

      Manage_NotificationModel.prototype.url = "/manage/contest_broadcasts/";

      return Manage_NotificationModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Manage_NotificationModel = Manage_NotificationModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, Manage_Moderator, _ref;
    Manage_Moderator = (function(_super) {
      __extends(Manage_Moderator, _super);

      function Manage_Moderator() {
        return Manage_Moderator.__super__.constructor.apply(this, arguments);
      }

      Manage_Moderator.prototype.url = function() {
        if (this.get('id')) {
          return "/manage/permissions/" + this.id;
        } else {
          return "/manage/permissions/?permissible_id=" + (this.get('permissible_id')) + "&permissible_type=" + (this.get('permissible_type'));
        }
      };

      return Manage_Moderator;

    })(window.HR.GenericModel);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.Manage_Moderator = Manage_Moderator;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, Manage_TemplateModel;
    Manage_TemplateModel = (function(_super) {
      __extends(Manage_TemplateModel, _super);

      function Manage_TemplateModel() {
        return Manage_TemplateModel.__super__.constructor.apply(this, arguments);
      }

      Manage_TemplateModel.prototype.defaults = function() {
        var attr;
        attr = {
          slug: "",
          body: ""
        };
        return attr;
      };

      Manage_TemplateModel.prototype.url = function() {
        var id;
        if (this.id) {
          id = this.id;
          return "/rest/templates/" + id;
        } else {
          return "/rest/templates";
        }
      };

      Manage_TemplateModel.prototype.setId = function(id) {
        this.id = id;
      };

      Manage_TemplateModel.prototype.parse = function(resp, xhr) {
        if (resp.model) {
          _.each(resp.model, (function(_this) {
            return function(val, key) {
              if (val === null || val === "null") {
                return resp.model[key] = "";
              }
            };
          })(this));
          resp.model;
        } else {
          _.each(resp, (function(_this) {
            return function(val, key) {
              if (val === null || val === "null") {
                return resp[key] = "";
              }
            };
          })(this));
        }
        return Manage_TemplateModel.__super__.parse.call(this, resp, xhr);
      };

      return Manage_TemplateModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Manage_TemplateModel = Manage_TemplateModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, MarkdownModel;
    MarkdownModel = (function(_super) {
      __extends(MarkdownModel, _super);

      function MarkdownModel() {
        return MarkdownModel.__super__.constructor.apply(this, arguments);
      }

      MarkdownModel.prototype.url = function() {
        return "/rest/markdown";
      };

      return MarkdownModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.MarkdownModel = MarkdownModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, MessageModel;
    MessageModel = (function(_super) {
      __extends(MessageModel, _super);

      function MessageModel() {
        return MessageModel.__super__.constructor.apply(this, arguments);
      }

      MessageModel.prototype.initialize = function() {};

      MessageModel.prototype.url = function() {
        if (this.id) {
          return "rest/messages/" + this.id;
        } else {
          return "rest/messages";
        }
      };

      return MessageModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.MessageModel = MessageModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, MessageThreadModel;
    MessageThreadModel = (function(_super) {
      __extends(MessageThreadModel, _super);

      function MessageThreadModel() {
        return MessageThreadModel.__super__.constructor.apply(this, arguments);
      }

      MessageThreadModel.prototype.initialize = function() {};

      MessageThreadModel.prototype.url = function() {
        if (this.id) {
          return "rest/threads/" + this.id;
        } else {
          return "rest/threads";
        }
      };

      MessageThreadModel.prototype.setLastMessage = function(last_message) {
        this.last_message = last_message;
      };

      MessageThreadModel.prototype.markAsUnread = function() {
        var that;
        that = this;
        return $.ajax({
          url: "/rest/threads/" + this.id + "/unread",
          success: function(data) {
            return that.set('unread_count', 1);
          }
        });
      };

      MessageThreadModel.prototype.markAsRead = function() {
        var that;
        that = this;
        return $.ajax({
          url: "/rest/threads/" + this.id + "/read",
          success: function(data) {
            that.set('unread_count', 0);
            return HR.appView.sidebarView.updateNotificationsCount();
          }
        });
      };

      return MessageThreadModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.MessageThreadModel = MessageThreadModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, NetworksModel;
    NetworksModel = (function(_super) {
      __extends(NetworksModel, _super);

      function NetworksModel() {
        return NetworksModel.__super__.constructor.apply(this, arguments);
      }

      NetworksModel.prototype.setUsername = function(username) {
        return this.username = username;
      };

      NetworksModel.prototype.baseURL = function() {
        var id, username;
        id = this.id || this.get("id");
        username = this.username || this.get("username");
        if (username) {
          return "hackers/" + username;
        } else {
          return "hackers/me";
        }
      };

      NetworksModel.prototype.cacheRefetch = false;

      NetworksModel.prototype.isEmpty = function() {
        var _model;
        if (this.sync_status === true) {
          _model = this.toJSON();
          if ((!_model.school || _model.school === '') && (!_model.company || _model.company === '') && (!_model.country || _model.country === '')) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };

      NetworksModel.prototype.isPartialEmpty = function() {
        var _model;
        if (this.sync_status === true) {
          _model = this.toJSON();
          if ((!_model.school || _model.school === '') || (!_model.company || _model.company === '') || (!_model.country || _model.country === '') || (!_model.fb_uid)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };

      return NetworksModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.NetworksModel = NetworksModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, NotificationModel;
    NotificationModel = (function(_super) {
      __extends(NotificationModel, _super);

      function NotificationModel() {
        return NotificationModel.__super__.constructor.apply(this, arguments);
      }

      NotificationModel.prototype.STATUS_CODE = {
        0: "UNSEEN",
        1: "UNREAD",
        2: "READ",
        3: "ARCHIVED",
        4: "DELETED",
        5: "SKIPPED"
      };

      NotificationModel.prototype.STATUS = {
        UNSEEN: 0,
        UNREAD: 1,
        READ: 2,
        ARCHIVED: 3,
        DELETED: 4,
        SKIPPED: 5
      };

      NotificationModel.prototype.STATUS_TEXT = {
        UNSEEN: "unseen",
        UNREAD: "unread",
        READ: "read",
        ARCHIVED: "archived",
        DELETED: "deleted",
        SKIPPED: "skipped"
      };

      NotificationModel.prototype.markSeen = function() {
        if (this.get('notification_status') === this.STATUS.UNSEEN) {
          this.set('notification_status', this.STATUS.UNREAD);
          return this.save(null, {
            success: function(data) {}
          });
        }
      };

      NotificationModel.prototype.markRead = function() {
        var id;
        if (this.get('notification_status') <= this.STATUS.UNREAD) {
          this.set('notification_status', this.STATUS.READ);
          id = this.get('id');
          return this.save(null, {
            success: function(model, resp) {
              if (HR.cachedNotificationsCollection) {
                HR.cachedNotificationsCollection.remove(id);
              }
              return HR.appView.navigationView.updateNotificationsCount(resp.unread_count);
            }
          });
        }
      };

      NotificationModel.prototype.url = function() {
        return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/notifications/" + (this.get('id'));
      };

      return NotificationModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.NotificationModel = NotificationModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, PlayoffModel;
    PlayoffModel = (function(_super) {
      __extends(PlayoffModel, _super);

      function PlayoffModel() {
        return PlayoffModel.__super__.constructor.apply(this, arguments);
      }

      return PlayoffModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.PlayoffModel = PlayoffModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, ProfileModel;
    ProfileModel = (function(_super) {
      __extends(ProfileModel, _super);

      function ProfileModel() {
        return ProfileModel.__super__.constructor.apply(this, arguments);
      }

      ProfileModel.prototype.baseURL = function() {
        var id, me, username;
        id = this.id || this.get("id");
        username = this.username || this.get("username");
        me = this.me || this.get("me") || !(id || username);
        if (me) {
          return "hackers/me";
        } else if (username) {
          return "hackers/" + username;
        } else if (id) {
          return "hackers/" + id;
        }
      };

      ProfileModel.prototype.cacheTimeout = 5 * 60;

      ProfileModel.prototype.setUsername = function(username) {
        this.username = username;
      };

      ProfileModel.prototype.setId = function(id) {
        this.id = id;
      };

      ProfileModel.prototype.keyPrefix = function() {
        return HR.key_prefix;
      };

      ProfileModel.prototype.isLoggedIn = function() {
        if (_.size(this.toJSON()) === 0 || !this.id) {
          return false;
        } else {
          return true;
        }
      };

      ProfileModel.prototype.isEmpty = function() {
        var _model;
        if (this.sync_status === true) {
          _model = this.toJSON();
          if ((!_model.school || _model.school === '') && (!_model.company || _model.company === '') && (!_model.country || _model.country === '')) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };

      ProfileModel.prototype.isPartialEmpty = function() {
        var _model;
        if (this.sync_status === true) {
          _model = this.toJSON();
          if ((!_model.school || _model.school === '') || (!_model.company || _model.company === '') || (!_model.country || _model.country === '') || (!_model.fb_uid)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };

      ProfileModel.prototype.save = function() {
        return Backbone.Model.prototype.save.apply(this, arguments);
      };

      ProfileModel.prototype.fetchScores = function() {
        var that;
        if (!this.isLoggedIn()) {
          return;
        }
        that = this;
        that.set('scores', {});
        return $.ajax({
          url: "/rest/hackers/" + (this.get('username')) + "/scores",
          success: function(data) {
            var obj;
            obj = {};
            _.each(data, function(x) {
              obj[x.name] = x;
              return obj[x.slug] = x;
            });
            that.set('scores', obj);
            return that.trigger('reset');
          }
        });
      };

      return ProfileModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.ProfileModel = ProfileModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, QuestionModel;
    QuestionModel = (function(_super) {
      __extends(QuestionModel, _super);

      function QuestionModel() {
        return QuestionModel.__super__.constructor.apply(this, arguments);
      }

      QuestionModel.prototype.initialize = function() {
        this.listenTo(this, 'reset change', this.cleanTag);
        return this.listenToOnce(this, 'reset', this.setChallenge);
      };

      QuestionModel.prototype.cleanTag = function() {
        return this.set('tags', this.get('tags') || []);
      };

      QuestionModel.prototype.baseURL = function() {
        if (this.id) {
          return "challenges/" + (this.get('challenge_slug')) + "/questions/" + this.id;
        } else {
          return "challenges/" + (this.get('challenge_slug')) + "/questions";
        }
      };

      QuestionModel.prototype.pageURL = function() {
        return QuestionModel.__super__.pageURL.call(this).replace("/questions", "/forum/questions");
      };

      QuestionModel.prototype.setChallenge = function() {
        this.log("Setting challenge");
        this.challenge = HR.model("challenge", {
          slug: this.get('challenge_slug'),
          contest_slug: this.contest_slug || this.get('contest_slug')
        });
        return this.challenge.cached();
      };

      QuestionModel.prototype.modelCrumbs = function() {
        var crumbs;
        crumbs = HR.collection('bread-crumbs');
        if (!this.challenge) {
          this.setChallenge();
        }
        if (!this.challenge.id) {
          this.listenToOnce(this.challenge, 'reset', this.breadCrumbs);
        }
        crumbs.merge(this.challenge.modelCrumbs());
        crumbs.add({
          id: "" + (this.challenge.get('slug')) + "-forums",
          slug: "" + (this.challenge.get('slug')) + "-forums",
          name: "Discussions",
          path: "" + (this.challenge.pageURL()) + "/forum/questions"
        });
        return crumbs;
        return this.challenge;
      };

      return QuestionModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.QuestionModel = QuestionModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, RecommendedChallengeModel;
    RecommendedChallengeModel = (function(_super) {
      __extends(RecommendedChallengeModel, _super);

      function RecommendedChallengeModel() {
        return RecommendedChallengeModel.__super__.constructor.apply(this, arguments);
      }

      RecommendedChallengeModel.prototype.initialize = function(options) {
        this.tag = options.tag || "";
        return this.type = options.type || "";
      };

      RecommendedChallengeModel.prototype.url = function() {
        return "/rest/challenges/recommended?tag=" + this.tag + "&type=" + this.type;
      };

      return RecommendedChallengeModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.RecommendedChallengeModel = RecommendedChallengeModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, SecondaryEmailModel;
    SecondaryEmailModel = (function(_super) {
      __extends(SecondaryEmailModel, _super);

      function SecondaryEmailModel() {
        return SecondaryEmailModel.__super__.constructor.apply(this, arguments);
      }

      SecondaryEmailModel.prototype.urlRoot = "/rest/secondary_emails";

      SecondaryEmailModel.prototype.url = Backbone.Model.prototype.url;

      SecondaryEmailModel.prototype.idAttribute = "email64";

      SecondaryEmailModel.prototype.resend_confirmation = function(success) {
        return $.ajax({
          url: "" + (this.url()) + "/resend_confirmation",
          type: "POST",
          success: function(data) {
            return success(data);
          }
        });
      };

      SecondaryEmailModel.prototype.make_primary = function(success) {
        return $.ajax({
          url: "" + (this.url()) + "/make_primary",
          type: "PUT",
          success: function(data) {
            return success(data);
          }
        });
      };

      return SecondaryEmailModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.SecondaryEmailModel = SecondaryEmailModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, SubmissionModel, _ref;
    SubmissionModel = (function(_super) {
      __extends(SubmissionModel, _super);

      function SubmissionModel() {
        return SubmissionModel.__super__.constructor.apply(this, arguments);
      }

      SubmissionModel.prototype.initialize = function() {
        this.time = 3000;
        this.count = 0;
        return this.listenToOnce(this, 'reset', (function(_this) {
          return function() {
            return _this.setChallenge();
          };
        })(this));
      };

      SubmissionModel.prototype.baseURL = function() {
        var path;
        path = "";
        if (this.challenge instanceof Backbone.Model) {
          path += "challenges/" + (this.challenge.get('slug') || this.get('challenge_slug')) + "/";
        }
        if (_.isFinite(parseInt(this.get('id'), 10))) {
          path += "submissions/" + this.id;
        } else {
          path += "submissions";
        }
        return path;
      };

      SubmissionModel.prototype.cacheTimeout = 10;

      SubmissionModel.prototype.setChallenge = function(challenge) {
        this.challenge = challenge;
        if (!this.challenge) {
          this.challenge = this.get('challenge_slug') || this.get('slug');
        }
        if (!(this.challenge instanceof Backbone.Model || !this.challenge)) {
          this.challenge_slug = this.challenge;
          this.challenge = HR.model("challenge", {
            slug: this.challenge_slug,
            contest_slug: this.contest_slug || this.get('contest_slug')
          });
          return this.challenge.cached({
            success: (function(_this) {
              return function() {
                return _this.trigger('reset');
              };
            })(this)
          });
        }
      };

      SubmissionModel.prototype.pageURL = function() {
        return "" + (this.ns()) + "submissions/" + (this.get('kind')) + "/" + (this.get('id'));
      };

      SubmissionModel.prototype.modelCrumbs = function() {
        var crumbs;
        crumbs = HR.collection('bread-crumbs');
        if (this.challenge) {
          if (!this.challenge.id) {
            this.listenToOnce(this.challenge, 'reset', this.breadCrumbs);
          }
          crumbs.merge(this.challenge.modelCrumbs());
        }
        return crumbs;
      };

      SubmissionModel.prototype.parse = function(resp, xhr) {
        var $panel, original_response, social_share, that, url, url_prefix, url_suffix, _base, _base1, _name, _name1;
        original_response = resp;
        if ((xhr && resp.status === true) || !xhr) {
          return SubmissionModel.__super__.parse.call(this, resp, xhr);
        }
        if (xhr) {
          resp = resp.model;
        }
        that = this;
        if (resp && resp.id && this.checker_processed(resp) && this.score_processed(resp) && HR.QUEUED_SUBMISSIONS && HR.QUEUED_SUBMISSIONS[resp.id]) {
          HR.QUEUED_SUBMISSIONS[resp.id] = void 0;
          $panel = $("#submission-success-messages").find("#submission-model-" + resp.id);
          if ($panel.length === 0) {
            $("#submission-success-messages").append("<div id='submission-model-" + resp.id + "' style='display: none;' class='submission-model-panel'></div>");
            $panel = $("#submission-success-messages").find("#submission-model-" + resp.id);
          }
          this.submission_success_view || (this.submission_success_view = new HR.SubmissionSuccessView({
            model: resp
          }));
          HR.QUEUED_SUBMISSIONS_VIEWS || (HR.QUEUED_SUBMISSIONS_VIEWS = {});
          (_base = HR.QUEUED_SUBMISSIONS_VIEWS)[_name = resp.id] || (_base[_name] = this.submission_success_view);
          _.each(_.keys(HR.QUEUED_SUBMISSIONS_VIEWS), function(key) {
            if (parseInt(key) !== parseInt(resp.id) && HR.QUEUED_SUBMISSIONS_VIEWS[key] !== void 0) {
              HR.QUEUED_SUBMISSIONS_VIEWS[key].destroy();
              return HR.QUEUED_SUBMISSIONS_VIEWS[key] = void 0;
            }
          });
          this.submission_success_view.setElement($panel).render();
          if (resp.unlocked_challenges) {
            url_prefix = document.location.protocol + '//' + document.location.host;
            url_suffix = "" + (HR.appController.get_current_contest_slug_url());
            url = url_prefix + url_suffix;
            social_share = new HR.SocialShareView({
              title: "Challenge Unlock",
              message: "Congratulations you have unlocked " + resp.unlocked_challenges + "!",
              tweet: "I have unlocked " + resp.unlocked_challenges + " on hackerrank " + url,
              url: url,
              type: "unlock"
            });
            social_share.render();
          }
        }
        if (resp && !(this.checker_processed(resp) && this.score_processed(resp))) {
          HR.subFetchThrottle || (HR.subFetchThrottle = {});
          (_base1 = HR.subFetchThrottle)[_name1 = resp.id] || (_base1[_name1] = _.throttle(function() {
            return that.fetch({
              disableThrobber: true
            });
          }, this.time - 50));
          setTimeout(function() {
            return HR.subFetchThrottle[resp.id]();
          }, this.time);
        }
        return SubmissionModel.__super__.parse.call(this, original_response, xhr);
      };

      SubmissionModel.prototype.checker_processed = function(resp) {
        if (resp.status_code === 0 || resp.status_code === 3) {
          return false;
        } else {
          return true;
        }
      };

      SubmissionModel.prototype.score_processed = function(resp) {
        if (resp.score_processed === 0 || resp.score_processed === 2) {
          return false;
        } else {
          return true;
        }
      };

      SubmissionModel.prototype.getCurrentPage = function() {
        return this.page;
      };

      SubmissionModel.prototype.getTotalGameData = function() {
        if (this.gamedata && this.gamedata['total']) {
          return this.gamedata['total'];
        } else {
          return 0;
        }
      };

      return SubmissionModel;

    })(window.HR.GenericModel);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.SubmissionModel = SubmissionModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TeamMemberModel;
    TeamMemberModel = (function(_super) {
      __extends(TeamMemberModel, _super);

      function TeamMemberModel() {
        return TeamMemberModel.__super__.constructor.apply(this, arguments);
      }

      TeamMemberModel.prototype.url = function() {
        if (this.get('id')) {
          return "/rest/teams/" + (this.get('team_id')) + "/members/" + (this.get('id'));
        } else {
          return "/rest/teams/" + (this.get('team_id')) + "/members";
        }
      };

      TeamMemberModel.prototype.approve = function(options) {
        return $.ajax({
          url: "/rest/teams/" + (this.get('team_id')) + "/members/" + (this.get('id')) + "/approve",
          type: 'PUT',
          success: options.success
        });
      };

      return TeamMemberModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.TeamMemberModel = TeamMemberModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TeamModel;
    TeamModel = (function(_super) {
      __extends(TeamModel, _super);

      function TeamModel() {
        return TeamModel.__super__.constructor.apply(this, arguments);
      }

      TeamModel.prototype.url = function() {
        if (this.get('id')) {
          return "/rest/teams/" + (this.get('id'));
        } else if (this.get('contest_id') && !this.get('name') && !this.get('slug')) {
          return "/rest/contests/" + (this.get('contest_id')) + "/teams";
        } else {
          return "/rest/teams";
        }
      };

      TeamModel.prototype.members = function() {
        if (!this._members && this.sync_status) {
          this._members = new HR.TeamMembersCollection;
          _.each(this.get("members"), function(member) {
            member["team_id"] = this.get('id');
            return this._members.add(new HR.TeamMemberModel(member));
          }, this);
        }
        return this._members || new HR.TeamMembersCollection;
      };

      return TeamModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.TeamModel = TeamModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TestCaseModel;
    TestCaseModel = (function(_super) {
      __extends(TestCaseModel, _super);

      function TestCaseModel() {
        return TestCaseModel.__super__.constructor.apply(this, arguments);
      }

      TestCaseModel.prototype.defaults = function() {
        var attr;
        attr = {
          input: "",
          input_text: "",
          output: "",
          output_text: "",
          score: 0,
          sample: false
        };
        return attr;
      };

      TestCaseModel.prototype.set = function(attributes, options) {
        return TestCaseModel.__super__.set.call(this, attributes, options);
      };

      TestCaseModel.prototype.url = function() {
        var data;
        data = "";
        if (this.data) {
          data = "?data=";
        }
        if (this.id) {
          return ("/rest/challenges/" + this.challenge_id + "/testcases/" + this.id) + data;
        } else {
          return ("/rest/challenges/" + this.challenge_id + "/testcases/") + data;
        }
      };

      TestCaseModel.prototype.setId = function(id) {
        this.id = id;
      };

      TestCaseModel.prototype.setChallengeId = function(challenge_id) {
        this.challenge_id = challenge_id;
      };

      TestCaseModel.prototype.getEditData = function() {
        return this.data = true;
      };

      TestCaseModel.prototype.parse = function(resp, xhr) {
        if (resp.model) {
          return resp.model;
        } else {
          return resp;
        }
      };

      return TestCaseModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.TestCaseModel = TestCaseModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TrackModel, _ref;
    TrackModel = (function(_super) {
      __extends(TrackModel, _super);

      function TrackModel() {
        return TrackModel.__super__.constructor.apply(this, arguments);
      }

      TrackModel.prototype.children = function() {
        if (!this._children) {
          this._children = HR.collection('track');
          if (_.isArray(this.get('children'))) {
            this._children.set(this.get('children'));
            this._children.each((function(_this) {
              return function(child) {
                return child.parent = _this;
              };
            })(this));
          }
        }
        return this._children;
      };

      TrackModel.prototype.pageURL = function() {
        return this.baseURL();
      };

      TrackModel.prototype.baseURL = function() {
        var path;
        path = "tracks";
        if (this.parent) {
          path += "/" + (this.parent.get('slug'));
        }
        return path += "/" + (this.get('slug'));
      };

      TrackModel.prototype.defaultHierarchy = function() {
        var children, firstChild;
        children = HR.collection('track', [this]);
        firstChild = this.children().first();
        if (firstChild) {
          children.merge(firstChild.defaultHierarchy());
        }
        return children;
      };

      return TrackModel;

    })(window.HR.GenericModel);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.TrackModel = TrackModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var CampusRepReferralModel, HR, _ref;
    CampusRepReferralModel = (function(_super) {
      __extends(CampusRepReferralModel, _super);

      function CampusRepReferralModel() {
        return CampusRepReferralModel.__super__.constructor.apply(this, arguments);
      }

      CampusRepReferralModel.prototype.url = function() {
        return "/rest/campus_rep_hackers";
      };

      return CampusRepReferralModel;

    })(window.HR.GenericModel);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.CampusRepReferralModel = CampusRepReferralModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_ChallengeLanguageModel, HR;
    Administration_ChallengeLanguageModel = (function(_super) {
      __extends(Administration_ChallengeLanguageModel, _super);

      function Administration_ChallengeLanguageModel() {
        return Administration_ChallengeLanguageModel.__super__.constructor.apply(this, arguments);
      }

      Administration_ChallengeLanguageModel.prototype.url = function() {
        return "/rest/administration/challenges/" + (this.get('challenge_id')) + "/languages";
      };

      return Administration_ChallengeLanguageModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Administration_ChallengeLanguageModel = Administration_ChallengeLanguageModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_ChallengeModel, HR;
    Administration_ChallengeModel = (function(_super) {
      __extends(Administration_ChallengeModel, _super);

      function Administration_ChallengeModel() {
        return Administration_ChallengeModel.__super__.constructor.apply(this, arguments);
      }

      Administration_ChallengeModel.prototype.url = function() {
        var _url;
        _url = "/rest/administration";
        if (this.get('contest_id')) {
          _url += "/contests/" + (this.get('contest_id')) + "/challenges";
          if (this.get('challenge_id')) {
            _url += "/" + (this.get('challenge_id'));
          }
        } else if (this.get('id')) {
          _url += "/challenges/" + (this.get('id'));
        } else if (this.get('challenge_id')) {
          _url += "/challenges/" + (this.get('challenge_id'));
        } else {
          _url += "/challenges";
        }
        return _url;
      };

      Administration_ChallengeModel.prototype.max_limit = {
        description: 300
      };

      Administration_ChallengeModel.prototype.toggleLanguage = function(data) {
        var languages;
        languages = this.get("languages");
        if (data.state === "enable") {
          languages = _.union(languages, [data.language_key]);
        } else {
          languages = _.without(languages, data.language_key);
        }
        this.set("languages", languages);
        return $.ajax("" + (this.url()) + "/allowed_languages", {
          type: "PUT",
          data: {
            languages: languages
          }
        });
      };

      Administration_ChallengeModel.prototype.mod_url = function(username) {
        return "" + (this.url()) + "/moderator?username=" + username;
      };

      Administration_ChallengeModel.prototype.getTags = function() {
        if (this.get('tags')) {
          return this.get('tags');
        } else {
          return [];
        }
      };

      Administration_ChallengeModel.prototype.get_checker_limit = function(field, lang_key) {
        var checkerlimits, result;
        result = void 0;
        checkerlimits = this.get("checkerlimits");
        if (checkerlimits && checkerlimits[lang_key]) {
          if (field === "time") {
            result = checkerlimits[lang_key]["timelimit"];
          } else if (field === "mem") {
            result = checkerlimits[lang_key]["memorylimit"];
          }
        }
        return result;
      };

      Administration_ChallengeModel.prototype.update_language_data = function(lang_data, lang_key) {
        var checkerlimits;
        if (lang_data["time_limit"] !== void 0 || lang_data["mem_limit"] !== void 0) {
          checkerlimits = this.get("checkerlimits");
          if (!checkerlimits) {
            checkerlimits = {};
          }
          lang_data = checkerlimits[lang_key];
          if (!lang_data) {
            lang_data = {};
          }
          if (lang_data["time_limit"] !== void 0) {
            lang_data["timelimit"] = parseInt(lang_data["time_limit"]);
          }
          if (lang_data["mem_limit"] !== void 0) {
            lang_data["timelimit"] = parseInt(lang_data["mem_limit"]);
          }
          checkerlimits[lang_key] = lang_data;
          this.set("checkerlimits", lang_data);
        }
        if (lang_data["template_head"] !== void 0) {
          this.set("" + lang_key + "_template_head", lang_data["template_head"]);
        }
        if (lang_data["template_body"] !== void 0) {
          this.set("" + lang_key + "_template", lang_data["template_body"]);
        }
        if (lang_data["template_tail"] !== void 0) {
          return this.set("" + lang_key + "_template_tail", lang_data["template_tail"]);
        }
      };

      return Administration_ChallengeModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Administration_ChallengeModel = Administration_ChallengeModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_CompanyHackerShortlistModel, HR;
    Administration_CompanyHackerShortlistModel = (function(_super) {
      __extends(Administration_CompanyHackerShortlistModel, _super);

      function Administration_CompanyHackerShortlistModel() {
        return Administration_CompanyHackerShortlistModel.__super__.constructor.apply(this, arguments);
      }

      Administration_CompanyHackerShortlistModel.prototype.url = function() {
        return "/rest/administration/companies/" + (this.get('company_id')) + "/contests/" + (this.get('contest_id')) + "/hackers/" + (this.get('hacker_id')) + "/hackerboard/shortlist";
      };

      return Administration_CompanyHackerShortlistModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Administration_CompanyHackerShortlistModel = Administration_CompanyHackerShortlistModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_CompanyModel, HR;
    Administration_CompanyModel = (function(_super) {
      __extends(Administration_CompanyModel, _super);

      function Administration_CompanyModel() {
        return Administration_CompanyModel.__super__.constructor.apply(this, arguments);
      }

      Administration_CompanyModel.prototype.url = function() {
        var _url;
        _url = "/rest/administration";
        if (this.get('contest_id')) {
          _url += "/contests/" + (this.get('contest_id')) + "/companies";
          if (this.get('company_id')) {
            _url += "/" + (this.get('company_id'));
          }
        } else if (this.get('id')) {
          _url += "/companies/" + (this.get('id'));
        } else if (this.get('company_id')) {
          _url += "/companies/" + (this.get('company_id'));
        } else {
          _url += "/companies";
        }
        return _url;
      };

      Administration_CompanyModel.prototype.max_limit = {
        pitch: 300
      };

      return Administration_CompanyModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Administration_CompanyModel = Administration_CompanyModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_CompanyOfficeModel, HR;
    Administration_CompanyOfficeModel = (function(_super) {
      __extends(Administration_CompanyOfficeModel, _super);

      function Administration_CompanyOfficeModel() {
        return Administration_CompanyOfficeModel.__super__.constructor.apply(this, arguments);
      }

      Administration_CompanyOfficeModel.prototype.url = function() {
        var _url;
        _url = "/rest/administration/companies/" + (this.get('company_id')) + "/offices";
        if (this.get("id")) {
          _url += "/" + (this.get('id'));
        }
        return _url;
      };

      return Administration_CompanyOfficeModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Administration_CompanyOfficeModel = Administration_CompanyOfficeModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_CompanyPositionModel, HR;
    Administration_CompanyPositionModel = (function(_super) {
      __extends(Administration_CompanyPositionModel, _super);

      function Administration_CompanyPositionModel() {
        return Administration_CompanyPositionModel.__super__.constructor.apply(this, arguments);
      }

      Administration_CompanyPositionModel.prototype.url = function() {
        var _url;
        _url = "/rest/administration/companies/" + (this.get('company_id')) + "/positions";
        if (this.get('id')) {
          _url += "/" + (this.get('id'));
        }
        return _url;
      };

      return Administration_CompanyPositionModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Administration_CompanyPositionModel = Administration_CompanyPositionModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_ContestModel, HR;
    Administration_ContestModel = (function(_super) {
      __extends(Administration_ContestModel, _super);

      function Administration_ContestModel() {
        return Administration_ContestModel.__super__.constructor.apply(this, arguments);
      }

      Administration_ContestModel.prototype.url = function() {
        var _url;
        _url = "/rest/administration/contests";
        if (this.get('id')) {
          _url += "/" + (this.get('id'));
        }
        return _url;
      };

      Administration_ContestModel.prototype.max_limit = {
        tagline: 100
      };

      Administration_ContestModel.prototype.mod_url = function(username) {
        return "" + (this.url()) + "/moderator?username=" + username;
      };

      Administration_ContestModel.prototype.challenge_url = function(slug) {
        return "" + (this.url()) + "/challenge?slug=" + slug;
      };

      Administration_ContestModel.prototype.update_challenges_order_url = function() {
        return "" + (this.url()) + "/update_challenges_order";
      };

      Administration_ContestModel.prototype.update_challenge_weights_url = function() {
        return "" + (this.url()) + "/update_challenge_weights";
      };

      Administration_ContestModel.prototype.update_flags_url = function(ca_id) {
        return "" + (this.url()) + "/update_flags?ca_id=" + ca_id;
      };

      Administration_ContestModel.prototype.association_url = function(ca_id) {
        return "" + (this.url()) + "/association?ca_id=" + ca_id;
      };

      return Administration_ContestModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Administration_ContestModel = Administration_ContestModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_TestCaseModel, HR;
    Administration_TestCaseModel = (function(_super) {
      __extends(Administration_TestCaseModel, _super);

      function Administration_TestCaseModel() {
        return Administration_TestCaseModel.__super__.constructor.apply(this, arguments);
      }

      Administration_TestCaseModel.prototype.url = function() {
        var _url;
        _url = "/rest/administration/challenges/" + (this.get('challenge_id')) + "/test_cases";
        if (this.get('id')) {
          _url += "/" + (this.get('id'));
        }
        return _url;
      };

      return Administration_TestCaseModel;

    })(window.HR.GenericModel);
    HR = window.HR;
    return HR.Administration_TestCaseModel = Administration_TestCaseModel;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var GenericCollection, HR, _ref;
    GenericCollection = (function(_super) {
      __extends(GenericCollection, _super);

      function GenericCollection() {
        return GenericCollection.__super__.constructor.apply(this, arguments);
      }

      GenericCollection.prototype.url = function() {
        return "" + (this.restURL()) + "?" + (this.queryParams());
      };

      GenericCollection.prototype.queryParams = function() {
        var _query;
        if (!this.page || this.page < 1) {
          this.page = 1;
        }
        this.limit || (this.limit = 10);
        _query = this.query ? "&query=" + this.query : "";
        return "offset=" + ((this.page - 1) * this.limit) + "&limit=" + this.limit + _query;
      };

      GenericCollection.prototype.restPrefix = true;

      GenericCollection.prototype.restURL = function() {
        var rest, _url;
        _url = "" + (this.ns(rest = true)) + (this.baseURL());
        return "" + (HR.restURL(_url, this.restPrefix));
      };

      GenericCollection.prototype.pageURL = function() {
        return "" + (this.ns()) + (this.baseURL());
      };

      GenericCollection.prototype.getTotal = function() {
        return this.total;
      };

      GenericCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      GenericCollection.prototype.cacheModels = false;

      GenericCollection.prototype.keyPrefix = function() {
        return HR.profile().get('key_prefix');
      };

      GenericCollection.prototype.baseURL = function() {
        return '/dummies';
      };

      GenericCollection.prototype.ns = function(rest) {
        if (rest == null) {
          rest = false;
        }
        return HR.namespace(this.contest_slug, rest);
      };

      GenericCollection.prototype.collectionCrumbs = function() {
        return HR.collection('bread-crumbs');
      };

      GenericCollection.prototype.setContestCrumb = function() {
        var contest, contest_slug;
        contest_slug = this.contest_slug || this.get('contest-slug');
        if (contest_slug) {
          return contest = HR.model('contest', {
            slug: this.contest_slug
          }).cached({
            success: (function(_this) {
              return function(model) {
                return _this.crumbs.merge(model.breadCrumbs(), {
                  at: 0
                });
              };
            })(this)
          });
        }
      };

      GenericCollection.prototype.breadCrumbs = function() {
        if (!this.crumbs) {
          this.crumbs = HR.collection('bread-crumbs');
          this.setContestCrumb();
        }
        this.crumbs.merge(this.collectionCrumbs());
        return this.crumbs;
      };

      GenericCollection.prototype.merge = function(collection, options) {
        return this.add(collection.models, options);
      };

      GenericCollection.prototype.parse = function(resp, xhr) {
        var f, parsed, set_data_fields, that, _fn, _i, _len;
        if (xhr !== void 0 || resp.models) {
          this.sync_status = true;
          set_data_fields = ['total', 'page', 'activities', 'round_data', 'available', 'ongoing_count', 'slug_title', 'errors', 'current_hacker', 'contest', 'gross'];
          that = this;
          _fn = function(f) {
            if (resp[f] !== void 0) {
              return that[f] = resp[f];
            }
          };
          for (_i = 0, _len = set_data_fields.length; _i < _len; _i++) {
            f = set_data_fields[_i];
            _fn(f);
          }
          parsed = GenericCollection.__super__.parse.call(this, resp.models, xhr);
        } else {
          parsed = GenericCollection.__super__.parse.call(this, resp, xhr);
        }
        parsed = _.map(parsed, (function(_this) {
          return function(modelData) {
            var model;
            model = new _this.model(modelData);
            if (_this.cacheModels) {
              model.cacheSet();
            }
            return model;
          };
        })(this));
        return parsed;
      };

      return GenericCollection;

    })(Backbone.Collection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.GenericCollection = GenericCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var AnswerCollection, HR, _ref;
    AnswerCollection = (function(_super) {
      __extends(AnswerCollection, _super);

      function AnswerCollection() {
        return AnswerCollection.__super__.constructor.apply(this, arguments);
      }

      AnswerCollection.prototype.model = window.HR.AnswerModel;

      AnswerCollection.prototype.setChallengeSlug = function(challenge_slug) {
        return this.challenge_slug = challenge_slug;
      };

      AnswerCollection.prototype.getChallengeSlug = function() {
        return this.challenge_slug;
      };

      AnswerCollection.prototype.setQuestionId = function(question_id) {
        return this.question_id = question_id;
      };

      AnswerCollection.prototype.getQuestionId = function() {
        return this.question_id;
      };

      AnswerCollection.prototype.baseURL = function() {
        return "challenges/" + this.challenge_slug + "/questions/" + this.question_id + "/answers";
      };

      return AnswerCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.AnswerCollection = AnswerCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var APIConsumerCollection, HR, _ref;
    APIConsumerCollection = (function(_super) {
      __extends(APIConsumerCollection, _super);

      function APIConsumerCollection() {
        return APIConsumerCollection.__super__.constructor.apply(this, arguments);
      }

      APIConsumerCollection.prototype.url = function() {
        return "/rest/api_consumers";
      };

      return APIConsumerCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.APIConsumerCollection = APIConsumerCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ArchivedContestsCollection, HR, _ref;
    ArchivedContestsCollection = (function(_super) {
      __extends(ArchivedContestsCollection, _super);

      function ArchivedContestsCollection() {
        return ArchivedContestsCollection.__super__.constructor.apply(this, arguments);
      }

      ArchivedContestsCollection.prototype.model = window.HR.ContestModel;

      ArchivedContestsCollection.prototype.metaKeys = ["total", "page"];

      ArchivedContestsCollection.prototype.initialize = function(options) {
        this.limit = 50;
        return this.page = parseInt(options.page) || 1;
      };

      ArchivedContestsCollection.prototype.baseURL = function() {
        return "rest/contests/archived";
      };

      ArchivedContestsCollection.prototype.restURL = function() {
        return "" + (this.baseURL());
      };

      ArchivedContestsCollection.prototype.parse = function(resp, xhr) {
        this.total = resp.total;
        return ArchivedContestsCollection.__super__.parse.call(this, resp, xhr);
      };

      ArchivedContestsCollection.prototype.setTotal = function(total) {
        this.total = total;
      };

      ArchivedContestsCollection.prototype.getTotal = function() {
        return this.total;
      };

      return ArchivedContestsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ArchivedContestsCollection = ArchivedContestsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var BlogTemplatesCollection, HR, _ref;
    BlogTemplatesCollection = (function(_super) {
      __extends(BlogTemplatesCollection, _super);

      function BlogTemplatesCollection() {
        return BlogTemplatesCollection.__super__.constructor.apply(this, arguments);
      }

      BlogTemplatesCollection.prototype.model = window.HR.BlogTemplateModel;

      BlogTemplatesCollection.prototype.url = function() {
        return "/rest/blogtemplates";
      };

      return BlogTemplatesCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.BlogTemplatesCollection = BlogTemplatesCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var BlogsCollection, HR, _ref;
    BlogsCollection = (function(_super) {
      __extends(BlogsCollection, _super);

      function BlogsCollection() {
        return BlogsCollection.__super__.constructor.apply(this, arguments);
      }

      BlogsCollection.prototype.model = window.HR.BlogModel;

      BlogsCollection.prototype.initialize = function(options) {
        this.limit || (this.limit = 10);
        this.page = 1;
        return this.total = 0;
      };

      BlogsCollection.prototype.baseURL = function() {
        return "rest/blogs";
      };

      BlogsCollection.prototype.pageURL = function() {
        return "oldblog";
      };

      BlogsCollection.prototype.restURL = function() {
        return "" + (this.baseURL());
      };

      BlogsCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      BlogsCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      BlogsCollection.prototype.getTotal = function() {
        return this.total;
      };

      BlogsCollection.prototype.parse = function(resp, xhr) {
        this.total = resp.total;
        return BlogsCollection.__super__.parse.call(this, resp, xhr);
      };

      return BlogsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.BlogsCollection = BlogsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var BreadCrumbsCollection, HR, _ref;
    BreadCrumbsCollection = (function(_super) {
      __extends(BreadCrumbsCollection, _super);

      function BreadCrumbsCollection() {
        return BreadCrumbsCollection.__super__.constructor.apply(this, arguments);
      }

      BreadCrumbsCollection.prototype.model = window.HR.BreadCrumbModel;

      BreadCrumbsCollection.prototype.cacheTimeout = 5 * 60;

      BreadCrumbsCollection.prototype.baseURL = function() {
        return '';
      };

      return BreadCrumbsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.BreadCrumbsCollection = BreadCrumbsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var BroadcastCollection, HR, _ref;
    BroadcastCollection = (function(_super) {
      __extends(BroadcastCollection, _super);

      function BroadcastCollection() {
        return BroadcastCollection.__super__.constructor.apply(this, arguments);
      }

      BroadcastCollection.prototype.model = window.HR.BroadcastModel;

      BroadcastCollection.prototype.initialize = function(options) {
        this.contest_id = options.contest_id;
        return this.category = options.category;
      };

      BroadcastCollection.prototype.restURL = function() {
        return "/rest/administration/broadcasts/find";
      };

      BroadcastCollection.prototype.queryParams = function() {
        var count;
        this.query = "";
        count = 0;
        if (this.contest_id && _.isNumber(this.contest_id)) {
          this.query = "" + this.query + "contest_id=" + this.contest_id;
          count++;
        }
        if (this.category) {
          if (count > 0) {
            this.query = "" + this.query + "&";
          }
          this.query = "" + this.query + "category=" + this.category;
        }
        return this.query;
      };

      BroadcastCollection.prototype.publicityBroadcast = function() {
        return this.findWhere({
          category: "contest-new"
        });
      };

      return BroadcastCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.BroadcastCollection = BroadcastCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var CategoryCollection, HR, _ref;
    CategoryCollection = (function(_super) {
      __extends(CategoryCollection, _super);

      function CategoryCollection() {
        return CategoryCollection.__super__.constructor.apply(this, arguments);
      }

      CategoryCollection.prototype.model = window.HR.CategoryModel;

      CategoryCollection.prototype.baseURL = function() {
        return '';
      };

      CategoryCollection.prototype.defaultHierarchy = function() {
        var members;
        members = HR.collection('category');
        if (this.first()) {
          members.merge(this.first().defaultHierarchy());
        }
        return members;
      };

      return CategoryCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.CategoryCollection = CategoryCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  jQuery(function() {
    var ChallengeStatsCollection, ChallengesCollection, HR, _ref;
    ChallengesCollection = (function(_super) {
      __extends(ChallengesCollection, _super);

      function ChallengesCollection() {
        return ChallengesCollection.__super__.constructor.apply(this, arguments);
      }

      ChallengesCollection.prototype.model = window.HR.ChallengeModel;

      ChallengesCollection.prototype.initialize = function(options) {
        if (options !== void 0 && options.filter !== void 0) {
          this._filter = options.filter;
        }
        this.filters = [];
        if (this._filter) {
          this.filters = this._filters.split("+");
        }
        this.limit || (this.limit = 20);
        this.page = 1;
        if (options !== void 0 && options.sort_by !== void 0) {
          this.sort_by = options.sort_by;
        }
        if (options !== void 0 && options.sort_dir !== void 0) {
          this.sort_dir = options.sort_dir;
        }
        return ChallengesCollection.__super__.initialize.call(this, options);
      };

      ChallengesCollection.prototype.fetch = function(options) {
        if (options == null) {
          options = {};
        }
        this.min_fetch_timelapse = 40 * 1000;
        return ChallengesCollection.__super__.fetch.call(this, options);
      };

      ChallengesCollection.prototype.cacheModels = false;

      ChallengesCollection.prototype.showLoader = false;

      ChallengesCollection.prototype.metaKeys = ["current_track", "total"];

      ChallengesCollection.prototype.parse = function(resp, xhr) {
        _.each(resp.models, function(model) {
          return HR.appController.setModel(model, 'challenge', "slug-" + model.slug);
        });
        this.current_track = resp.current_track;
        return ChallengesCollection.__super__.parse.call(this, resp, xhr);
      };

      ChallengesCollection.prototype.addFilter = function(filter) {
        if (!(__indexOf.call(this.filters, filter) >= 0)) {
          return this.filters.push(filter);
        }
      };

      ChallengesCollection.prototype.removeFilter = function(filter) {
        var i;
        i = $.inArray(filter, this.filters);
        if (i !== -1) {
          return this.filters.splice(i, 1);
        }
      };

      ChallengesCollection.prototype.setFilters = function(filters) {
        this.filters = filters;
      };

      ChallengesCollection.prototype.setSortBy = function(sort_by) {
        this.sort_by = sort_by;
      };

      ChallengesCollection.prototype.setSortDir = function(sort_dir) {
        this.sort_dir = sort_dir;
      };

      ChallengesCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      ChallengesCollection.prototype.setLimit = function(limit) {
        this.limit = limit;
      };

      ChallengesCollection.prototype.setCategories = function(category_slugs) {
        this.category_slugs = category_slugs;
      };

      ChallengesCollection.prototype.setTrackSlug = function(track_slug) {
        this.track_slug = track_slug;
      };

      ChallengesCollection.prototype.setChapterSlug = function(chapter_slug) {
        this.chapter_slug = chapter_slug;
      };

      ChallengesCollection.prototype.setQuery = function(query) {
        this.query = query;
        return this.cacheModels = false;
      };

      ChallengesCollection.prototype.setContest = function(contest_slug) {
        this.contest_slug = contest_slug;
      };

      ChallengesCollection.prototype.setLoginTracking = function(login_tacking) {
        this.login_tacking = login_tacking;
      };

      ChallengesCollection.prototype.getTotal = function() {
        return this.total;
      };

      ChallengesCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      ChallengesCollection.prototype.baseURL = function() {
        var url;
        if (this.tag) {
          return "tags/" + this.tag + "/challenges";
        } else if (this.category_slugs) {
          return url = "categories/" + (this.category_slugs.join('|')) + "/challenges";
        } else if (this.track_slug) {
          return url = "tracks/" + this.track_slug + "/" + this.chapter_slug + "/challenges";
        } else {
          return "challenges";
        }
      };

      ChallengesCollection.prototype.pageURL = function() {
        var url;
        url = ChallengesCollection.__super__.pageURL.call(this);
        url = url.replace("|", "/");
        if (this.tag || this.contest_slug || this.category_slugs) {
          url = url.replace("/challenges", "");
        }
        return url;
      };

      ChallengesCollection.prototype.queryParams = function() {
        var filter_string, query;
        query = ChallengesCollection.__super__.queryParams.call(this);
        if (this._asTrack) {
          query += "as_track=true";
        }
        if (this.query) {
          query += "&query=" + this.query;
        }
        if (this.filters) {
          filter_string = this.filters.join("+");
          query += "&filter=" + filter_string;
        }
        if (this.sort_by) {
          query += "&sort_by=" + this.sort_by;
        }
        if (this.sort_by && this.sort_dir) {
          query += "&sort_dir=" + this.sort_dir;
        }
        if (this.login_tacking) {
          query += "&track_login=true";
        }
        return query;
      };

      return ChallengesCollection;

    })(window.HR.GenericCollection);
    ChallengeStatsCollection = (function(_super) {
      __extends(ChallengeStatsCollection, _super);

      function ChallengeStatsCollection() {
        return ChallengeStatsCollection.__super__.constructor.apply(this, arguments);
      }

      ChallengeStatsCollection.prototype.model = window.HR.ChallengeStats;

      ChallengeStatsCollection.prototype.completed = function() {
        return this.select(function(challenge) {
          return challenge.get('completed');
        });
      };

      ChallengeStatsCollection.prototype.completion = function() {
        return ((this.completed().length / this.total) * 100).round();
      };

      ChallengeStatsCollection.prototype.stats = function() {
        return {
          completed: this.completed().length,
          completion: this.completion(),
          total: this.total,
          languages: this.languagesDisplay()
        };
      };

      ChallengeStatsCollection.prototype.languagesDisplay = function() {
        var languages;
        return languages = _.map(this.languages, (function(_this) {
          return function(language) {
            return lang_display_mapping[language] || language;
          };
        })(this));
      };

      return ChallengeStatsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    HR.ChallengesCollection = ChallengesCollection;
    return HR.ChallengeStatsCollection = ChallengeStatsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ChecklistCollection, HR, _ref;
    ChecklistCollection = (function(_super) {
      __extends(ChecklistCollection, _super);

      function ChecklistCollection() {
        return ChecklistCollection.__super__.constructor.apply(this, arguments);
      }

      ChecklistCollection.prototype.model = window.HR.ChecklistModel;

      ChecklistCollection.prototype.setChallenge = function(slug) {
        this.slug = slug;
      };

      ChecklistCollection.prototype.url = function() {
        var url, url_prefix;
        url_prefix = "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/";
        return url = url_prefix + ("challenges/" + this.slug + "/checklist");
      };

      return ChecklistCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ChecklistCollection = ChecklistCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ChronologicalSubmissionsCollection, HR, _ref;
    ChronologicalSubmissionsCollection = (function(_super) {
      __extends(ChronologicalSubmissionsCollection, _super);

      function ChronologicalSubmissionsCollection() {
        return ChronologicalSubmissionsCollection.__super__.constructor.apply(this, arguments);
      }

      ChronologicalSubmissionsCollection.prototype.model = window.HR.SubmissionModel;

      ChronologicalSubmissionsCollection.prototype.baseURL = function() {
        return "submissions/";
      };

      ChronologicalSubmissionsCollection.prototype.url = function() {
        return "" + (this.restURL()) + "?" + (this.queryParams());
      };

      ChronologicalSubmissionsCollection.prototype.limit = 10;

      ChronologicalSubmissionsCollection.prototype.cacheTimeout = 10;

      ChronologicalSubmissionsCollection.prototype.showLoader = false;

      ChronologicalSubmissionsCollection.prototype.setContest = function(contest_slug) {
        this.contest_slug = contest_slug;
      };

      ChronologicalSubmissionsCollection.prototype.setPage = function(page) {
        return this.page = page;
      };

      ChronologicalSubmissionsCollection.prototype.getTotal = function() {
        return this.total;
      };

      ChronologicalSubmissionsCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      return ChronologicalSubmissionsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ChronologicalSubmissionsCollection = ChronologicalSubmissionsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var CompaniesCollection, HR, _ref;
    CompaniesCollection = (function(_super) {
      __extends(CompaniesCollection, _super);

      function CompaniesCollection() {
        return CompaniesCollection.__super__.constructor.apply(this, arguments);
      }

      CompaniesCollection.prototype.initialize = function(options) {
        this.hacker = "me";
        return CompaniesCollection.__super__.initialize.call(this, options);
      };

      CompaniesCollection.prototype.setOffset = function(offset) {
        this.offset = offset;
      };

      CompaniesCollection.prototype.getTotal = function() {
        return this.total;
      };

      CompaniesCollection.prototype.url = function() {
        var urll;
        if (this.company_slug) {
          urll = "/rest/contests/" + this.contest_slug + "/companies/" + this.company_slug;
        } else if (this.challenge_slug) {
          urll = "/rest/contests/" + this.contest_slug + "/challenges/" + this.challenge_slug + "/companies";
        } else {
          urll = "/rest/contests/" + this.contest_slug + "/companies";
        }
        if (this.all) {
          urll = urll + "?full=true";
        }
        return urll;
      };

      return CompaniesCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.CompaniesCollection = CompaniesCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ContestsCollection, HR, _ref;
    ContestsCollection = (function(_super) {
      __extends(ContestsCollection, _super);

      function ContestsCollection() {
        return ContestsCollection.__super__.constructor.apply(this, arguments);
      }

      ContestsCollection.prototype.cacheTimeout = 30;

      ContestsCollection.prototype.model = window.HR.ContestModel;

      ContestsCollection.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.limit = options.limit || 10;
        this.page = options.page || 1;
        this.key = options.key;
        this.track_slug = options.track_slug;
        return this.contest_slug = options.contest_slug;
      };

      ContestsCollection.prototype.restURL = function() {
        var url;
        return url = "/rest/contests/upcoming";
      };

      ContestsCollection.prototype.queryParams = function() {
        var query;
        query = ContestsCollection.__super__.queryParams.call(this);
        if (this.contest_slug) {
          query += "&contest_slug=" + this.contest_slug;
        }
        if (this.track_slug) {
          query += "&track_slug=" + this.track_slug;
        }
        return query;
      };

      ContestsCollection.prototype.ordered = function() {
        var cloned;
        cloned = this.clone();
        cloned.each((function(_this) {
          return function(contest) {
            if (contest.running()) {
              cloned.remove(contest);
              return cloned.add(contest, {
                at: 0
              });
            }
          };
        })(this));
        return cloned;
      };

      ContestsCollection.prototype.grouped = function() {
        var ordered;
        ordered = this.ordered();
        return [
          {
            key: 'active',
            contests: HR.collection('contests', ordered.where({
              archived: false
            }))
          }, {
            key: 'archived',
            contests: HR.collection('contests', ordered.where({
              archived: true
            }))
          }
        ];
      };

      ContestsCollection.prototype.cacheModels = true;

      ContestsCollection.prototype.showLoader = false;

      ContestsCollection.prototype.parse = function(resp, xhr) {
        this.total = resp.total;
        this.page = resp.page;
        this.weekly = resp.weekly;
        return ContestsCollection.__super__.parse.call(this, resp, xhr);
      };

      ContestsCollection.prototype.getTotal = function() {
        return this.total;
      };

      ContestsCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      ContestsCollection.prototype.setTotal = function(total) {
        this.total = total;
      };

      return ContestsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ContestsCollection = ContestsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var DashboardHistoryCollection, DashboardProgressCollection, HR, _ref;
    DashboardHistoryCollection = (function(_super) {
      __extends(DashboardHistoryCollection, _super);

      function DashboardHistoryCollection() {
        return DashboardHistoryCollection.__super__.constructor.apply(this, arguments);
      }

      DashboardHistoryCollection.prototype.model = window.HR.DashboardHistory;

      DashboardHistoryCollection.prototype.setHacker = function(username) {
        this.username = username;
      };

      DashboardHistoryCollection.prototype.showLoader = false;

      DashboardHistoryCollection.prototype.restPrefix = false;

      DashboardHistoryCollection.prototype.baseURL = function() {
        return "dashboard/history";
      };

      DashboardHistoryCollection.prototype.restURL = function() {
        var rest, _url;
        _url = "/rest" + (this.ns(rest = true)) + (this.baseURL());
        return "" + (HR.restURL(_url, this.restPrefix));
      };

      DashboardHistoryCollection.prototype.queryParams = function() {
        if (this.username) {
          return "username=" + this.username;
        } else {
          return DashboardHistoryCollection.__super__.queryParams.call(this);
        }
      };

      return DashboardHistoryCollection;

    })(window.HR.GenericCollection);
    DashboardProgressCollection = (function(_super) {
      __extends(DashboardProgressCollection, _super);

      function DashboardProgressCollection() {
        return DashboardProgressCollection.__super__.constructor.apply(this, arguments);
      }

      DashboardProgressCollection.prototype.model = window.HR.DashboardProgressModel;

      return DashboardProgressCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    HR.DashboardHistoryCollection = DashboardHistoryCollection;
    return HR.DashboardProgressCollection = DashboardProgressCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ExtendedNetworkCollection, HR, _ref;
    ExtendedNetworkCollection = (function(_super) {
      __extends(ExtendedNetworkCollection, _super);

      function ExtendedNetworkCollection() {
        return ExtendedNetworkCollection.__super__.constructor.apply(this, arguments);
      }

      ExtendedNetworkCollection.prototype.model = window.HR.LeaderboardModel;

      ExtendedNetworkCollection.prototype.setLevel = function(level) {
        return this.level = level;
      };

      ExtendedNetworkCollection.prototype.url = function() {
        var url;
        url = "/rest/networks/extended";
        if (this.level) {
          url += "?level=" + this.level;
        }
        return url;
      };

      return ExtendedNetworkCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ExtendedNetworkCollection = ExtendedNetworkCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var FlashesCollection, HR, _ref;
    FlashesCollection = (function(_super) {
      __extends(FlashesCollection, _super);

      function FlashesCollection() {
        return FlashesCollection.__super__.constructor.apply(this, arguments);
      }

      FlashesCollection.prototype.model = window.HR.FlashModel;

      FlashesCollection.prototype.url = function() {
        return "/rest/hackers/me/flashes";
      };

      FlashesCollection.prototype.clearFlashes = function() {
        return $.get('/rest/hackers/me/clear_flashes');
      };

      FlashesCollection.prototype.getFlashes = function() {};

      FlashesCollection.prototype.getTotal = function() {
        return this.total;
      };

      return FlashesCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.FlashesCollection = FlashesCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var GameCollection, HR, _ref;
    GameCollection = (function(_super) {
      __extends(GameCollection, _super);

      function GameCollection() {
        return GameCollection.__super__.constructor.apply(this, arguments);
      }

      GameCollection.prototype.model = window.HR.GameModel;

      GameCollection.prototype.url = function() {
        return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/games/?sids=" + (this.sids.join());
      };

      return GameCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.GameCollection = GameCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var GameSetCollection, HR, _ref;
    GameSetCollection = (function(_super) {
      __extends(GameSetCollection, _super);

      function GameSetCollection() {
        return GameSetCollection.__super__.constructor.apply(this, arguments);
      }

      GameSetCollection.prototype.model = window.HR.GameSetModel;

      GameSetCollection.prototype.initialize = function() {
        return this.filter = "all";
      };

      GameSetCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      GameSetCollection.prototype.getPage = function() {
        return this.page;
      };

      GameSetCollection.prototype.getSid = function() {
        return this.sid;
      };

      GameSetCollection.prototype.setSid = function(sid) {
        this.sid = sid;
      };

      GameSetCollection.prototype.setFilter = function(filter) {
        this.filter = filter;
      };

      GameSetCollection.prototype.getFilter = function() {
        return this.filter;
      };

      GameSetCollection.prototype.url = function() {
        if (this.contest_slug) {
          return "/rest/contests/" + this.contest_slug + "/submissions/" + this.sid + "/gamesets/?offset=" + ((this.page - 1) * 5) + "&filter=" + this.filter;
        } else {
          return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/submissions/" + this.sid + "/gamesets/?offset=" + ((this.page - 1) * 5) + "&filter=" + this.filter;
        }
      };

      return GameSetCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.GameSetCollection = GameSetCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var GenericLeaderboardCollection, HR, _ref;
    GenericLeaderboardCollection = (function(_super) {
      __extends(GenericLeaderboardCollection, _super);

      function GenericLeaderboardCollection() {
        return GenericLeaderboardCollection.__super__.constructor.apply(this, arguments);
      }

      GenericLeaderboardCollection.prototype.model = window.HR.LeaderboardModel;

      GenericLeaderboardCollection.prototype.initialize = function(options) {
        this.limit = $.cookie('pagination_per_page_limit') || 10;
        return GenericLeaderboardCollection.__super__.initialize.call(this, options);
      };

      GenericLeaderboardCollection.prototype.validFilters = ['school', 'company', 'country', 'language'];

      GenericLeaderboardCollection.prototype.showLoader = false;

      GenericLeaderboardCollection.prototype.applicableFilters = function() {
        this._applicableFilters || (this._applicableFilters = _.compact(this.validFilters));
        if (!this.challenge) {
          this._applicableFilters = _.without(this._applicableFilters, 'language');
        }
        return this._applicableFilters;
      };

      GenericLeaderboardCollection.prototype.disableFilter = function(filter) {
        return this._applicableFilters = _.without(this.applicableFilters(), filter);
      };

      GenericLeaderboardCollection.prototype.filters = {};

      GenericLeaderboardCollection.prototype.queryParams = function() {
        var query;
        query = GenericLeaderboardCollection.__super__.queryParams.call(this);
        if (this.filtered() && this.hasFilters()) {
          query += "&" + (this.getFilterString()) + "&filter_kinds=" + (this.filterKinds());
        }
        return query;
      };

      GenericLeaderboardCollection.prototype.filterKinds = function() {
        return _.keys(this.filters);
      };

      GenericLeaderboardCollection.prototype.filtered = function() {
        return !_.isEmpty(this.filters);
      };

      GenericLeaderboardCollection.prototype.hasFilters = function() {
        var hasFilters;
        hasFilters = false;
        _.each(this.filters, (function(_this) {
          return function(values, filter) {
            if (values && values.length > 0) {
              return hasFilters = true;
            }
          };
        })(this));
        return hasFilters;
      };

      GenericLeaderboardCollection.prototype.setFiltersFromString = function(string) {
        var subStrings, that;
        that = this;
        subStrings = [string];
        this.filters = {};
        _.each(subStrings, function(str) {
          var filter, split, subFilters;
          split = str.split('=');
          filter = split[0];
          if (split[1].length > 0) {
            subFilters = split[1].split(':');
          } else {
            subFilters = [];
          }
          return that.filters[filter] = subFilters;
        });
        return this.filters;
      };

      GenericLeaderboardCollection.prototype.getFilterString = function() {
        var subStrings;
        subStrings = [];
        _.each(this.filters, function(values, filter) {
          return subStrings.push("" + filter + "=" + (values.join(':')));
        });
        return subStrings.join("&");
      };

      GenericLeaderboardCollection.prototype.addFilter = function(filter, value) {
        var _base;
        this.page = 1;
        (_base = this.filters)[filter] || (_base[filter] = []);
        if (!_.include(this.filters[filter], value)) {
          this.filters[filter].push(encodeURIComponent(value));
        }
        return this.route();
      };

      GenericLeaderboardCollection.prototype.removeFilter = function(filter, value) {
        if (value) {
          this.filters[filter] = _.without(this.filters[filter], value);
        } else {
          delete this.filters[filter];
        }
        return this.route();
      };

      GenericLeaderboardCollection.prototype.removeFilters = function() {
        this.filters = {};
        return this.route();
      };

      GenericLeaderboardCollection.prototype.empty = function() {
        return _.filter(_.map(this.toJSON(), function(model) {
          return model.hacker;
        }), function(hacker) {
          return hacker !== void 0;
        }).length === 0;
      };

      return GenericLeaderboardCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.GenericLeaderboardCollection = GenericLeaderboardCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var GroupedSubmissionsCollection, HR, _ref;
    GroupedSubmissionsCollection = (function(_super) {
      __extends(GroupedSubmissionsCollection, _super);

      function GroupedSubmissionsCollection() {
        return GroupedSubmissionsCollection.__super__.constructor.apply(this, arguments);
      }

      GroupedSubmissionsCollection.prototype.model = window.HR.SubmissionModel;

      GroupedSubmissionsCollection.prototype.baseURL = function() {
        return "submissions/";
      };

      GroupedSubmissionsCollection.prototype.url = function() {
        return "" + (this.restURL()) + "grouped?" + (this.queryParams());
      };

      GroupedSubmissionsCollection.prototype.limit = 5;

      GroupedSubmissionsCollection.prototype.cacheTimeout = 10;

      GroupedSubmissionsCollection.prototype.showLoader = false;

      GroupedSubmissionsCollection.prototype.setContest = function(contest_slug) {
        this.contest_slug = contest_slug;
      };

      GroupedSubmissionsCollection.prototype.setPage = function(page) {
        return this.page = page;
      };

      GroupedSubmissionsCollection.prototype.getTotal = function() {
        return this.total;
      };

      GroupedSubmissionsCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      return GroupedSubmissionsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.GroupedSubmissionsCollection = GroupedSubmissionsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerClubCollection, _ref;
    HackerClubCollection = (function(_super) {
      __extends(HackerClubCollection, _super);

      function HackerClubCollection() {
        return HackerClubCollection.__super__.constructor.apply(this, arguments);
      }

      HackerClubCollection.prototype.setSlug = function(slug) {
        this.slug = slug;
      };

      HackerClubCollection.prototype.url = function() {
        if (this.slug) {
          return "/rest/hackerclubs?slug=" + this.slug;
        } else {
          return "/rest/hackerclubs";
        }
      };

      return HackerClubCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.HackerClubCollection = HackerClubCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerApplicationsCollection, _ref;
    HackerApplicationsCollection = (function(_super) {
      __extends(HackerApplicationsCollection, _super);

      function HackerApplicationsCollection() {
        return HackerApplicationsCollection.__super__.constructor.apply(this, arguments);
      }

      HackerApplicationsCollection.prototype.model = window.HR.HackerApplicationModel;

      HackerApplicationsCollection.prototype.initialize = function(options) {
        this.visa = "";
        this.role = "";
        this.country = "";
        this.key = "";
        return this.limit = $.cookie('pagination_per_page_limit') || 5;
      };

      HackerApplicationsCollection.prototype.metaKeys = ["total", "page"];

      HackerApplicationsCollection.prototype.url = function() {
        return "/rest/contests/" + this.contestId + "/companies/" + this.companyId + "/hackerapplications/list?offset=" + ((this.page - 1) * this.getLimit()) + "&limit=" + (this.getLimit()) + "&visa=" + this.visa + "&role=" + this.role + "&country=" + this.country + "&key=" + this.key;
      };

      HackerApplicationsCollection.prototype.setContestId = function(contestId) {
        this.contestId = contestId;
      };

      HackerApplicationsCollection.prototype.setCompanyId = function(companyId) {
        this.companyId = companyId;
      };

      HackerApplicationsCollection.prototype.setKey = function(key) {
        this.key = key;
      };

      HackerApplicationsCollection.prototype.getCompanyId = function() {
        return this.companyId;
      };

      HackerApplicationsCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      HackerApplicationsCollection.prototype.pageURL = function() {
        if (this.key !== "") {
          return "/contests/" + this.contestId + "/applications/" + this.key + "/" + (this.getFilterString()) + "/";
        } else {
          return "/manage/" + this.contestId + "/applications/" + this.companyId + "/" + (this.getFilterString()) + "/";
        }
      };

      HackerApplicationsCollection.prototype.setPageURL = function(pageuri) {
        this.pageuri = pageuri;
      };

      HackerApplicationsCollection.prototype.setTotal = function(total) {
        this.total = total;
      };

      HackerApplicationsCollection.prototype.setFilterString = function(fString) {
        var filters;
        this.fString = fString;
        if (this.fString === null) {
          this.fString = "--";
        }
        filters = this.fString.split("-");
        this.country = filters[0] || "";
        this.visa = filters[1] || "";
        return this.role = filters[2] || "";
      };

      HackerApplicationsCollection.prototype.getFilterString = function() {
        return "" + this.country + "-" + this.visa + "-" + this.role;
      };

      HackerApplicationsCollection.prototype.getTotal = function() {
        return this.total;
      };

      HackerApplicationsCollection.prototype.getCurrentPage = function() {
        return this.page || 1;
      };

      HackerApplicationsCollection.prototype.getLimit = function() {
        return this.limit;
      };

      HackerApplicationsCollection.prototype.setLimit = function(limit) {
        HR.appController.cleanCollectionCache('hackerapplications');
        return this.limit = limit;
      };

      return HackerApplicationsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.HackerApplicationsCollection = HackerApplicationsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerChallengesCollection, _ref;
    HackerChallengesCollection = (function(_super) {
      __extends(HackerChallengesCollection, _super);

      function HackerChallengesCollection() {
        return HackerChallengesCollection.__super__.constructor.apply(this, arguments);
      }

      HackerChallengesCollection.prototype.model = window.HR.HackerChallengeModel;

      HackerChallengesCollection.prototype.url = function() {
        return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/companies/" + this.companyId + "/hackerapplications/";
      };

      HackerChallengesCollection.prototype.setCompanyId = function(companyId) {
        this.companyId = companyId;
      };

      HackerChallengesCollection.prototype.getCompanyId = function() {
        return this.companyId;
      };

      HackerChallengesCollection.prototype.parse = function(resp, xhr) {
        return resp.models.challenges;
      };

      HackerChallengesCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      HackerChallengesCollection.prototype.setFilter = function(query) {
        this.query = query;
        return this.page = 1;
      };

      HackerChallengesCollection.prototype.pageURL = function() {
        return "/manage/applications/" + this.companyId + "/";
      };

      HackerChallengesCollection.prototype.setTotal = function(total) {
        this.total = total;
      };

      HackerChallengesCollection.prototype.getTotal = function() {
        return this.total;
      };

      HackerChallengesCollection.prototype.getCurrentPage = function() {
        return this.page || 1;
      };

      HackerChallengesCollection.prototype.getLimit = function() {
        return 1;
      };

      return HackerChallengesCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.HackerChallengesCollection = HackerChallengesCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerEventCollection, _ref;
    HackerEventCollection = (function(_super) {
      __extends(HackerEventCollection, _super);

      function HackerEventCollection() {
        return HackerEventCollection.__super__.constructor.apply(this, arguments);
      }

      HackerEventCollection.prototype.initialize = function(options) {
        this.hacker = "me";
        this.offset = 0;
        this.total = 0;
        return HackerEventCollection.__super__.initialize.call(this, options);
      };

      HackerEventCollection.prototype.setHacker = function(hacker) {
        this.hacker = hacker;
      };

      HackerEventCollection.prototype.showLoader = false;

      HackerEventCollection.prototype.setOffset = function(offset) {
        this.offset = offset;
      };

      HackerEventCollection.prototype.url = function() {
        return "/rest/contests/master/hackers/" + this.hacker + "/events?offset=" + this.offset;
      };

      return HackerEventCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.HackerEventCollection = HackerEventCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerHackosCollection, _ref;
    HackerHackosCollection = (function(_super) {
      __extends(HackerHackosCollection, _super);

      function HackerHackosCollection() {
        return HackerHackosCollection.__super__.constructor.apply(this, arguments);
      }

      HackerHackosCollection.prototype.model = window.HR.HackerHackosModel;

      HackerHackosCollection.prototype.initialize = function(options) {
        this.id = options.id;
        this.offset = 0;
        if (options.page) {
          this.offset = this.limit * (options.page - 1);
          return this.page = options.page;
        }
      };

      HackerHackosCollection.prototype.baseURL = function() {
        return "/rest/hackers/" + this.id + "/hackos";
      };

      HackerHackosCollection.prototype.url = function() {
        return "" + (this.baseURL()) + "?" + (this.queryParams());
      };

      HackerHackosCollection.prototype.pageURL = function() {
        return "/" + this.id + "/hackos";
      };

      HackerHackosCollection.prototype.limit = 10;

      HackerHackosCollection.prototype.cacheTimeout = 10;

      HackerHackosCollection.prototype.showLoader = true;

      return HackerHackosCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.HackerHackosCollection = HackerHackosCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, HackerPostCollection, _ref;
    HackerPostCollection = (function(_super) {
      __extends(HackerPostCollection, _super);

      function HackerPostCollection() {
        return HackerPostCollection.__super__.constructor.apply(this, arguments);
      }

      HackerPostCollection.prototype.initialize = function(options) {
        return HackerPostCollection.__super__.initialize.call(this, options);
      };

      HackerPostCollection.prototype.setHacker = function(hacker) {
        this.hacker = hacker;
      };

      HackerPostCollection.prototype.showLoader = false;

      HackerPostCollection.prototype.setOffset = function(offset) {
        this.offset = offset != null ? offset : 0;
      };

      HackerPostCollection.prototype.url = function() {
        return "/rest/contests/master/hackers/" + this.hacker + "/posts?offset=" + this.offset;
      };

      return HackerPostCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.HackerPostCollection = HackerPostCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, JudgeSubmissionsCollection, _ref;
    JudgeSubmissionsCollection = (function(_super) {
      __extends(JudgeSubmissionsCollection, _super);

      function JudgeSubmissionsCollection() {
        return JudgeSubmissionsCollection.__super__.constructor.apply(this, arguments);
      }

      JudgeSubmissionsCollection.prototype.model = window.HR.SubmissionModel;

      JudgeSubmissionsCollection.prototype.baseURL = function() {
        return "judge_submissions/";
      };

      JudgeSubmissionsCollection.prototype.pageURL = function() {
        return "" + (this.ns()) + "judge/submissions/";
      };

      JudgeSubmissionsCollection.prototype.url = function() {
        return "" + (this.restURL()) + "?" + (this.queryParams());
      };

      JudgeSubmissionsCollection.prototype.queryParams = function() {
        var query;
        query = JudgeSubmissionsCollection.__super__.queryParams.apply(this, arguments);
        if (this.team_slug) {
          query += "&hacker_id=" + this.team_slug;
        }
        if (this.challenge_slug) {
          query += "&challenge_id=" + this.challenge_slug;
        }
        return query;
      };

      JudgeSubmissionsCollection.prototype.limit = 10;

      JudgeSubmissionsCollection.prototype.cacheTimeout = 10;

      JudgeSubmissionsCollection.prototype.showLoader = false;

      JudgeSubmissionsCollection.prototype.getTotal = function() {
        return this.total;
      };

      JudgeSubmissionsCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      return JudgeSubmissionsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.JudgeSubmissionsCollection = JudgeSubmissionsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, Manage_Moderators, _ref;
    Manage_Moderators = (function(_super) {
      __extends(Manage_Moderators, _super);

      function Manage_Moderators() {
        return Manage_Moderators.__super__.constructor.apply(this, arguments);
      }

      Manage_Moderators.prototype.model = window.HR.Manage_Moderator;

      Manage_Moderators.prototype.initialize = function(options) {
        Manage_Moderators.__super__.initialize.call(this, options);
        if (options && options.permissible_id) {
          this.permissible_id = options.permissible_id;
        }
        if (options && options.permissible_type) {
          return this.permissible_type = options.permissible_type;
        }
      };

      Manage_Moderators.prototype.url = function() {
        return "/manage/permissions/?permissible_id=" + this.permissible_id + "&permissible_type=" + this.permissible_type;
      };

      Manage_Moderators.prototype.metaKeys = ['permissible_type', 'permissible_id'];

      return Manage_Moderators;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.Manage_Moderators = Manage_Moderators;
  });

}).call(this);
(function() {


}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, ManageSubmissionsHackersCollection, _ref;
    ManageSubmissionsHackersCollection = (function(_super) {
      __extends(ManageSubmissionsHackersCollection, _super);

      function ManageSubmissionsHackersCollection() {
        return ManageSubmissionsHackersCollection.__super__.constructor.apply(this, arguments);
      }

      ManageSubmissionsHackersCollection.prototype.model = window.HR.ProfileModel;

      ManageSubmissionsHackersCollection.prototype.initialize = function(options) {
        this.limit = 5;
        this.errors = "";
        if (!HR.filters) {
          return HR.filters = {
            mshc: {
              challenges: [],
              hackers: [],
              start_date: "",
              end_date: "",
              status: "all"
            }
          };
        }
      };

      ManageSubmissionsHackersCollection.prototype.url = function() {
        return "/rest/contests/" + this.contestSlug + "/hackers/filter?" + (this.getFilterString()) + "&offset=" + ((this.page - 1) * this.limit) + "&limit=" + this.limit;
      };

      ManageSubmissionsHackersCollection.prototype.setContest = function(contestSlug) {
        this.contestSlug = contestSlug;
      };

      ManageSubmissionsHackersCollection.prototype.parse = function(resp, xhr) {
        if (!resp.error && resp.challenges) {
          HR.filters.mshc.challenges = resp.challenges;
          HR.filters.mshc.hackers = resp.hackers;
          HR.filters.mshc.start_date = resp.start_date;
          HR.filters.mshc.end_date = resp.end_date;
          HR.filters.mshc.status = resp.status;
        }
        this.errors = resp.error || "";
        return ManageSubmissionsHackersCollection.__super__.parse.call(this, resp, xhr);
      };

      ManageSubmissionsHackersCollection.prototype.addFilter = function(kind, value) {
        if (kind === "challenges") {
          return HR.filters.mshc.challenges = _.union(HR.filters.mshc.challenges, [value]);
        } else if (kind === "hackers") {
          return HR.filters.mshc.hackers = _.union(HR.filters.mshc.hackers, [value]);
        } else {
          return HR.filters.mshc[kind] = value;
        }
      };

      ManageSubmissionsHackersCollection.prototype.removeFilter = function(kind, value) {
        if (HR.filters.mshc[kind]) {
          return HR.filters.mshc[kind] = _.without(HR.filters.mshc[kind], value);
        }
      };

      ManageSubmissionsHackersCollection.prototype.getFilterString = function() {
        return "challenges=" + (HR.filters.mshc.challenges.join(",")) + "&hackers=" + (HR.filters.mshc.hackers.join(",")) + "&start_date=" + (HR.filters.mshc.start_date || "") + "&end_date=" + (HR.filters.mshc.end_date || "") + "&status=" + HR.filters.mshc.status;
      };

      ManageSubmissionsHackersCollection.prototype.setFilterString = function(string) {
        var strings;
        strings = string.split("&");
        return _.each(strings, (function(_this) {
          return function(string) {
            var params;
            params = string.split("=");
            if (params[0] === "challenges" || params[0] === "hackers") {
              return HR.filters.mshc[params[0]] = params[1].split(",");
            } else {
              return HR.filters.mshc[params[0]] = params[1];
            }
          };
        })(this));
      };

      ManageSubmissionsHackersCollection.prototype.getFilters = function() {
        return HR.filters.mshc;
      };

      ManageSubmissionsHackersCollection.prototype.pageURL = function() {
        return "/manage/contests/" + this.contestSlug + "/all_submissions/" + (this.getFilterString()) + "/";
      };

      ManageSubmissionsHackersCollection.prototype.setLimit = function(limit) {
        HR.appController.cleanCollectionCache('hacker_submissions');
        this.limit = limit;
        return this.page = 1;
      };

      ManageSubmissionsHackersCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      ManageSubmissionsHackersCollection.prototype.setTotal = function(total) {
        this.total = total;
      };

      ManageSubmissionsHackersCollection.prototype.getTotal = function() {
        return this.total;
      };

      ManageSubmissionsHackersCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      ManageSubmissionsHackersCollection.prototype.getLimit = function() {
        return this.limit;
      };

      return ManageSubmissionsHackersCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ManageSubmissionsHackersCollection = ManageSubmissionsHackersCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ChallengeAssociationCollection, HR, _ref;
    ChallengeAssociationCollection = (function(_super) {
      __extends(ChallengeAssociationCollection, _super);

      function ChallengeAssociationCollection() {
        return ChallengeAssociationCollection.__super__.constructor.apply(this, arguments);
      }

      ChallengeAssociationCollection.prototype.model = window.HR.ChallengeAssociationModel;

      ChallengeAssociationCollection.prototype.initialize = function(options) {
        return this.query = "";
      };

      ChallengeAssociationCollection.prototype.url = function() {
        if (this.getAll) {
          return "/rest/contests/" + this.contestId + "/challengeassociations/all";
        } else {
          return "/rest/contests/" + this.contestId + "/challengeassociations/?filter=" + this.query;
        }
      };

      ChallengeAssociationCollection.prototype.setContestId = function(contestId) {
        this.contestId = contestId;
      };

      ChallengeAssociationCollection.prototype.getContestId = function() {
        return this.contestId;
      };

      ChallengeAssociationCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      ChallengeAssociationCollection.prototype.setFilter = function(query) {
        this.query = query;
        return this.page = 1;
      };

      ChallengeAssociationCollection.prototype.pageURL = function() {
        return "/manage/contest/";
      };

      ChallengeAssociationCollection.prototype.setTotal = function(total) {
        this.total = total;
      };

      ChallengeAssociationCollection.prototype.getTotal = function() {
        return this.total;
      };

      ChallengeAssociationCollection.prototype.getCurrentPage = function() {
        return this.page || 1;
      };

      ChallengeAssociationCollection.prototype.getLimit = function() {
        return 10;
      };

      return ChallengeAssociationCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ChallengeAssociationCollection = ChallengeAssociationCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, ManageChallengeListCollection, _ref;
    ManageChallengeListCollection = (function(_super) {
      __extends(ManageChallengeListCollection, _super);

      function ManageChallengeListCollection() {
        return ManageChallengeListCollection.__super__.constructor.apply(this, arguments);
      }

      ManageChallengeListCollection.prototype.model = window.HR.Manage_ChallengeModel;

      ManageChallengeListCollection.prototype.initialize = function(options) {
        return this.query = "";
      };

      ManageChallengeListCollection.prototype.url = function() {
        var limit;
        limit = this.getLimit();
        return "/manage/challenges/?offset=" + ((this.page - 1) * limit) + "&filter=" + this.query;
      };

      ManageChallengeListCollection.prototype.metaKeys = ['page', 'total', 'filter'];

      ManageChallengeListCollection.prototype.setLimit = function(limit) {
        return this.limit = limit;
      };

      ManageChallengeListCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      ManageChallengeListCollection.prototype.setFilter = function(query) {
        this.query = query;
        return this.page = 1;
      };

      ManageChallengeListCollection.prototype.pageURL = function() {
        if (this.query.length > 0) {
          return "/manage/challenge/" + this.query + "/";
        } else {
          return "/manage/challenge/";
        }
      };

      ManageChallengeListCollection.prototype.setTotal = function(total) {
        this.total = total;
      };

      ManageChallengeListCollection.prototype.getTotal = function() {
        return this.total;
      };

      ManageChallengeListCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      ManageChallengeListCollection.prototype.getLimit = function() {
        return 10;
      };

      return ManageChallengeListCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ManageChallengeListCollection = ManageChallengeListCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ContestAccessCollection, HR, _ref;
    ContestAccessCollection = (function(_super) {
      __extends(ContestAccessCollection, _super);

      function ContestAccessCollection() {
        return ContestAccessCollection.__super__.constructor.apply(this, arguments);
      }

      ContestAccessCollection.prototype.model = window.HR.ContestAccessModel;

      ContestAccessCollection.prototype.initialize = function(options) {
        return this.query = "";
      };

      ContestAccessCollection.prototype.url = function() {
        return "/rest/contests/" + this.contestId + "/contestaccesses/";
      };

      ContestAccessCollection.prototype.setContestId = function(contestId) {
        this.contestId = contestId;
      };

      ContestAccessCollection.prototype.getContestId = function() {
        return this.contestId;
      };

      ContestAccessCollection.prototype.parse = function(resp, xhr) {
        return ContestAccessCollection.__super__.parse.call(this, resp, xhr);
      };

      return ContestAccessCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ContestAccessCollection = ContestAccessCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, ManageContestListCollection, _ref;
    ManageContestListCollection = (function(_super) {
      __extends(ManageContestListCollection, _super);

      function ManageContestListCollection() {
        return ManageContestListCollection.__super__.constructor.apply(this, arguments);
      }

      ManageContestListCollection.prototype.model = window.HR.Manage_ContestModel;

      ManageContestListCollection.prototype.initialize = function(options) {
        return this.query = "";
      };

      ManageContestListCollection.prototype.url = function() {
        var limit;
        limit = this.getLimit();
        return "/rest/contests/?offset=" + ((this.page - 1) * limit) + "&filter=" + this.query;
      };

      ManageContestListCollection.prototype.metaKeys = ['page', 'total', 'filter'];

      ManageContestListCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      ManageContestListCollection.prototype.setFilter = function(query) {
        this.query = query;
        return this.page = 1;
      };

      ManageContestListCollection.prototype.pageURL = function() {
        return "/manage/contest/";
      };

      ManageContestListCollection.prototype.setTotal = function(total) {
        this.total = total;
      };

      ManageContestListCollection.prototype.getTotal = function() {
        return this.total;
      };

      ManageContestListCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      ManageContestListCollection.prototype.getLimit = function() {
        return 10;
      };

      return ManageContestListCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ManageContestListCollection = ManageContestListCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, MessagesCollection, _ref;
    MessagesCollection = (function(_super) {
      __extends(MessagesCollection, _super);

      function MessagesCollection() {
        return MessagesCollection.__super__.constructor.apply(this, arguments);
      }

      MessagesCollection.prototype.model = window.HR.MessageModel;

      MessagesCollection.prototype.restPrefix = false;

      MessagesCollection.prototype.restURL = function() {
        if (this.from) {
          return "rest/messages?thread_id=" + this.thread_id + "&from=" + this.from;
        } else if (this.until) {
          return "rest/messages?thread_id=" + this.thread_id + "&until=" + this.until;
        } else {
          return "rest/messages?thread_id=" + this.thread_id;
        }
      };

      MessagesCollection.prototype.setFrom = function(from) {
        this.from = from;
      };

      MessagesCollection.prototype.setUntil = function(until) {
        this.until = until;
      };

      MessagesCollection.prototype.parse = function(resp, xhr) {
        this.thread = resp.thread;
        this.has_more = resp.has_more;
        return MessagesCollection.__super__.parse.call(this, resp, xhr);
      };

      MessagesCollection.prototype.comparator = function(a, b) {
        return b.get('id') - a.get('id');
      };

      return MessagesCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.MessagesCollection = MessagesCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, MessageThreadCollection, _ref;
    MessageThreadCollection = (function(_super) {
      __extends(MessageThreadCollection, _super);

      function MessageThreadCollection() {
        return MessageThreadCollection.__super__.constructor.apply(this, arguments);
      }

      MessageThreadCollection.prototype.model = window.HR.MessageThreadModel;

      MessageThreadCollection.prototype.restPrefix = false;

      MessageThreadCollection.prototype.restURL = function() {
        return "rest/threads";
      };

      return MessageThreadCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.MessageThreadCollection = MessageThreadCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, NetworkLeaderboardCollection, _ref;
    NetworkLeaderboardCollection = (function(_super) {
      __extends(NetworkLeaderboardCollection, _super);

      function NetworkLeaderboardCollection() {
        return NetworkLeaderboardCollection.__super__.constructor.apply(this, arguments);
      }

      NetworkLeaderboardCollection.prototype.model = window.HR.LeaderboardModel;

      NetworkLeaderboardCollection.prototype.setLevel = function(level) {
        return this.level = level;
      };

      NetworkLeaderboardCollection.prototype.setTrack = function(track) {
        return this.track = track;
      };

      NetworkLeaderboardCollection.prototype.setMod = function(mod) {
        return this.mod = mod;
      };

      NetworkLeaderboardCollection.prototype.initialize = function() {
        return this.profile = HR.profile();
      };

      NetworkLeaderboardCollection.prototype.url = function() {
        if (this.level) {
          return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/levels/" + this.level + "/leaderboard";
        } else {
          return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/mods/" + this.mod + "/tracks/" + this.track + "/leaderboard/";
        }
      };

      NetworkLeaderboardCollection.prototype.parse = function(resp, xhr) {
        var that;
        that = this;
        if (resp.models) {
          if (resp.current_hacker) {
            that.current_hacker = resp.current_hacker;
            that.setRankStat(that.current_hacker);
          } else {
            that.current_hacker = null;
          }
          _.each(resp.models, function(model) {
            return that.setRankStat(model);
          });
        }
        this.available = resp.available;
        return NetworkLeaderboardCollection.__super__.parse.call(this, resp, xhr);
      };

      NetworkLeaderboardCollection.prototype.setRankStat = function(model) {
        if (model.newrank) {
          if (model.oldrank) {
            if (model.newrank < model.oldrank) {
              model.up = true;
              return model.down = false;
            } else {
              model.up = false;
              return model.down = true;
            }
          } else {
            model.up = true;
            return model.down = false;
          }
        } else {
          model.up = false;
          return model.down = false;
        }
      };

      return NetworkLeaderboardCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.NetworkLeaderboardCollection = NetworkLeaderboardCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, NotificationsCollection, _ref;
    NotificationsCollection = (function(_super) {
      __extends(NotificationsCollection, _super);

      function NotificationsCollection() {
        return NotificationsCollection.__super__.constructor.apply(this, arguments);
      }

      NotificationsCollection.prototype.model = window.HR.NotificationModel;

      NotificationsCollection.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.page = options.page || 1;
        this.limit = 10;
        this.total = 0;
        return this.offset = 0;
      };

      NotificationsCollection.prototype.baseURL = function() {
        if (this.dashboard) {
          return "notifications/dashboard";
        } else {
          return "notifications";
        }
      };

      NotificationsCollection.prototype.queryParams = function() {
        if (this.unread_only) {
          return "status=unread&offset=" + this.offset + "&limit=" + this.limit;
        } else {
          if (this.notif_id) {
            return "notif_id=" + this.notif_id + "&offset=" + this.offset + "&limit=" + this.limit;
          } else {
            return NotificationsCollection.__super__.queryParams.call(this);
          }
        }
      };

      NotificationsCollection.prototype.setDashboard = function(dashboard) {
        this.dashboard = dashboard;
      };

      NotificationsCollection.prototype.showLoader = false;

      NotificationsCollection.prototype.comparator = function(item) {
        return -parseInt(item.get('created_at_epoch'));
      };

      NotificationsCollection.prototype.parse = function(resp, xhr) {
        if (!this.dashboard) {
          this.total = resp.total;
          this.read = resp.read;
          this.unread = resp.unread;
          this.has_more = resp.has_more;
          this.unseen = resp.unseen;
          if (resp.notif_page) {
            this.page = resp.notif_page;
          }
          HR.CONTEST_DISABLED = resp.contest_disabled;
          HR.CHALLENGES_DISABLED = resp.challenges_disabled;
        }
        return NotificationsCollection.__super__.parse.call(this, resp, xhr);
      };

      return NotificationsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.NotificationsCollection = NotificationsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, NvNLeaderboardCollection, _ref;
    NvNLeaderboardCollection = (function(_super) {
      __extends(NvNLeaderboardCollection, _super);

      function NvNLeaderboardCollection() {
        return NvNLeaderboardCollection.__super__.constructor.apply(this, arguments);
      }

      NvNLeaderboardCollection.prototype.model = window.HR.LeaderboardModel;

      NvNLeaderboardCollection.prototype.page = 1;

      NvNLeaderboardCollection.prototype.filters = {};

      NvNLeaderboardCollection.prototype.url = function() {
        if (this.kind) {
          return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/leaderboard/net_vs_net?kind=" + this.kind + "&offset=" + ((this.page - 1) * 10);
        } else {
          return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/leaderboard/net_vs_net?offset=" + ((this.page - 1) * 10);
        }
      };

      NvNLeaderboardCollection.prototype.pageURL = function() {
        if (this.kind) {
          return "" + (HR.appController.get_current_contest_namespace()) + "/leaderboard/nvn/kind/" + this.kind;
        } else {
          return "" + (HR.appController.get_current_contest_namespace()) + "/leaderboard/nvn";
        }
      };

      NvNLeaderboardCollection.prototype.setKind = function(kind) {
        return this.kind = kind;
      };

      NvNLeaderboardCollection.prototype.setPage = function(page) {
        return this.page = page;
      };

      NvNLeaderboardCollection.prototype.getTotal = function() {
        return this.total;
      };

      NvNLeaderboardCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      return NvNLeaderboardCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.NvNLeaderboardCollection = NvNLeaderboardCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, PlayoffCollection, _ref;
    PlayoffCollection = (function(_super) {
      __extends(PlayoffCollection, _super);

      function PlayoffCollection() {
        return PlayoffCollection.__super__.constructor.apply(this, arguments);
      }

      PlayoffCollection.prototype.model = window.HR.PlayoffModel;

      PlayoffCollection.prototype.setRound = function(round) {
        this.round = round;
      };

      PlayoffCollection.prototype.setSlug = function(slug) {
        this.slug = slug;
      };

      PlayoffCollection.prototype.url = function() {
        return "/rest/contests/" + (HR.appController.get_current_contest_slug()) + "/challenges/" + this.slug + "/playoffs/" + this.round;
      };

      return PlayoffCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.PlayoffCollection = PlayoffCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, PublicContestsCollection, _ref;
    PublicContestsCollection = (function(_super) {
      __extends(PublicContestsCollection, _super);

      function PublicContestsCollection() {
        return PublicContestsCollection.__super__.constructor.apply(this, arguments);
      }

      PublicContestsCollection.prototype.url = function() {
        return "/rest/contests/all_active_and_archived";
      };

      return PublicContestsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.PublicContestsCollection = PublicContestsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, QuestionCollection, _ref;
    QuestionCollection = (function(_super) {
      __extends(QuestionCollection, _super);

      function QuestionCollection() {
        return QuestionCollection.__super__.constructor.apply(this, arguments);
      }

      QuestionCollection.prototype.model = window.HR.QuestionModel;

      QuestionCollection.prototype.setChallengeSlug = function(challenge_slug) {
        return this.challenge_slug = challenge_slug;
      };

      QuestionCollection.prototype.getChallengeSlug = function() {
        return this.challenge_slug;
      };

      QuestionCollection.prototype.baseURL = function() {
        return "challenges/" + this.challenge_slug + "/questions";
      };

      QuestionCollection.prototype.pageURL = function() {
        return "" + (this.ns()) + "challenges/" + this.challenge_slug + "/forum/questions";
      };

      return QuestionCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.QuestionCollection = QuestionCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, RatingHistoryCollection, _ref;
    RatingHistoryCollection = (function(_super) {
      __extends(RatingHistoryCollection, _super);

      function RatingHistoryCollection() {
        return RatingHistoryCollection.__super__.constructor.apply(this, arguments);
      }

      RatingHistoryCollection.prototype.model = window.HR.RatingHistory;

      RatingHistoryCollection.prototype.setHacker = function(username) {
        this.username = username;
      };

      RatingHistoryCollection.prototype.showLoader = false;

      RatingHistoryCollection.prototype.restPrefix = false;

      RatingHistoryCollection.prototype.restURL = function() {
        return "rest/hackers/" + this.username + "/rating_histories";
      };

      return RatingHistoryCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.RatingHistoryCollection = RatingHistoryCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, SecondaryEmailCollection, _ref;
    SecondaryEmailCollection = (function(_super) {
      __extends(SecondaryEmailCollection, _super);

      function SecondaryEmailCollection() {
        return SecondaryEmailCollection.__super__.constructor.apply(this, arguments);
      }

      SecondaryEmailCollection.prototype.model = window.HR.SecondaryEmailModel;

      SecondaryEmailCollection.prototype.url = function() {
        return "/rest/secondary_emails";
      };

      return SecondaryEmailCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.SecondaryEmailCollection = SecondaryEmailCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, SubmissionsCollection, _ref;
    SubmissionsCollection = (function(_super) {
      __extends(SubmissionsCollection, _super);

      function SubmissionsCollection() {
        return SubmissionsCollection.__super__.constructor.apply(this, arguments);
      }

      SubmissionsCollection.prototype.model = window.HR.SubmissionModel;

      SubmissionsCollection.prototype.baseURL = function() {
        if (_.isObject(this.challenge)) {
          return "challenges/" + this.challenge_slug + "/submissions/";
        } else {
          return "submissions/";
        }
      };

      SubmissionsCollection.prototype.setContest = function(contest_slug) {
        this.contest_slug = contest_slug;
      };

      SubmissionsCollection.prototype.setChallenge = function(challenge_slug) {
        if (challenge_slug) {
          this.challenge_slug = challenge_slug;
          return this.challenge = HR.model('challenge', {
            slug: challenge_slug,
            contest_slug: this.contest_slug
          }).cached();
        }
      };

      SubmissionsCollection.prototype.cacheTimeout = 10;

      SubmissionsCollection.prototype.collectionCrumbs = function() {
        var crumbs;
        crumbs = SubmissionsCollection.__super__.collectionCrumbs.call(this);
        if (this.challenge) {
          if (!this.challenge.id) {
            this.listenToOnce(this.challenge, 'reset', this.breadCrumbs);
          }
          crumbs.merge(this.challenge.modelCrumbs());
        }
        return crumbs;
      };

      SubmissionsCollection.prototype.setPage = function(page) {
        return this.page = page;
      };

      SubmissionsCollection.prototype.getTotal = function() {
        return this.total;
      };

      SubmissionsCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      return SubmissionsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.SubmissionsCollection = SubmissionsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TeamsCollection, _ref;
    TeamsCollection = (function(_super) {
      __extends(TeamsCollection, _super);

      function TeamsCollection() {
        return TeamsCollection.__super__.constructor.apply(this, arguments);
      }

      TeamsCollection.prototype.url = function() {
        return "/rest/teams";
      };

      return TeamsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.TeamsCollection = TeamsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TeamMembersCollection, _ref;
    TeamMembersCollection = (function(_super) {
      __extends(TeamMembersCollection, _super);

      function TeamMembersCollection() {
        return TeamMembersCollection.__super__.constructor.apply(this, arguments);
      }

      TeamMembersCollection.prototype.url = function() {
        return "/rest/teams/" + this.team_id + "/members";
      };

      TeamMembersCollection.prototype.setTeamId = function(team_id) {
        this.team_id = team_id;
      };

      return TeamMembersCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.TeamMembersCollection = TeamMembersCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TestCaseCollection, _ref;
    TestCaseCollection = (function(_super) {
      __extends(TestCaseCollection, _super);

      function TestCaseCollection() {
        return TestCaseCollection.__super__.constructor.apply(this, arguments);
      }

      TestCaseCollection.prototype.model = window.HR.TestCaseModel;

      TestCaseCollection.prototype.url = function() {
        return "/rest/challenges/" + this.challenge_id + "/testcases/";
      };

      TestCaseCollection.prototype.setChallengeId = function(challenge_id) {
        this.challenge_id = challenge_id;
      };

      TestCaseCollection.prototype.getChallengeId = function() {
        return this.challenge_id;
      };

      TestCaseCollection.prototype.parse = function(resp, xhr) {
        this.total = resp.total;
        return resp.models;
      };

      return TestCaseCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.TestCaseCollection = TestCaseCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TrackCollection, _ref;
    TrackCollection = (function(_super) {
      __extends(TrackCollection, _super);

      function TrackCollection() {
        return TrackCollection.__super__.constructor.apply(this, arguments);
      }

      TrackCollection.prototype.model = window.HR.TrackModel;

      TrackCollection.prototype.baseURL = function() {
        return '/tracks';
      };

      TrackCollection.prototype.defaultHierarchy = function() {
        var members;
        members = HR.collection('track');
        if (this.first()) {
          members.merge(this.first().defaultHierarchy());
        }
        return members;
      };

      return TrackCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.TrackCollection = TrackCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TrackLeaderboardCollection, _ref;
    TrackLeaderboardCollection = (function(_super) {
      __extends(TrackLeaderboardCollection, _super);

      function TrackLeaderboardCollection() {
        return TrackLeaderboardCollection.__super__.constructor.apply(this, arguments);
      }

      TrackLeaderboardCollection.prototype.model = window.HR.LeaderboardModel;

      TrackLeaderboardCollection.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.limit = 10;
        this.track = options.track || "algorithms";
        this.page = options.page || 1;
        this.type = options.type || "contest";
        this.level = options.level || 1;
        this.filters = options.filters || {};
        return TrackLeaderboardCollection.__super__.initialize.call(this, options);
      };

      TrackLeaderboardCollection.prototype.showLoader = false;

      TrackLeaderboardCollection.prototype.metaKeys = ['current_hacker', 'total', 'available', 'filters'];

      TrackLeaderboardCollection.prototype.parse = function(resp, xhr) {
        var that;
        that = this;
        this.current_hacker = resp.current_hacker;
        this.available = resp.available;
        this.total = resp.total;
        return TrackLeaderboardCollection.__super__.parse.call(this, resp, xhr);
      };

      TrackLeaderboardCollection.prototype.queryParams = function() {
        var query;
        query = TrackLeaderboardCollection.__super__.queryParams.call(this);
        _.each(this.filters, function(key, val) {
          return query += "&" + val + "=" + key;
        });
        return "" + query + "&type=" + this.type + "&level=" + this.level;
      };

      TrackLeaderboardCollection.prototype.setFiltersFromString = function(string) {
        var subStrings, that;
        that = this;
        subStrings = string.split("&");
        this.filters = {};
        _.each(subStrings, function(str) {
          var split;
          split = str.split('=');
          if (split.length > 1) {
            return that.filters[split[0]] = split[1];
          }
        });
        return this.filters;
      };

      TrackLeaderboardCollection.prototype.getFilterString = function() {
        var subStrings;
        subStrings = [];
        _.each(this.filters, function(value, filter) {
          return subStrings.push("" + filter + "=" + value);
        });
        return subStrings.join("&");
      };

      TrackLeaderboardCollection.prototype.restURL = function() {
        var url;
        url = "rest/contests/master/tracks/" + this.track + "/leaderboard";
        if (!$.isEmptyObject(this.filters)) {
          return "" + url + "/filter";
        } else {
          return "" + url;
        }
      };

      TrackLeaderboardCollection.prototype.pageURL = function() {
        var url;
        url = "/leaderboard/" + this.track + "/" + this.type + "/level/" + this.level;
        if (!$.isEmptyObject(this.filters)) {
          return "" + url + "/filter/" + (this.getFilterString()) + "/page";
        } else {
          return "" + url + "/page";
        }
      };

      TrackLeaderboardCollection.prototype.url = function() {
        return "" + (this.restURL()) + "?" + (this.queryParams());
      };

      TrackLeaderboardCollection.prototype.addFilter = function(key, value) {
        return this.filters[key] = value;
      };

      TrackLeaderboardCollection.prototype.clearFilters = function() {
        return this.filters = {};
      };

      TrackLeaderboardCollection.prototype.setPage = function(page) {
        this.page = page;
      };

      TrackLeaderboardCollection.prototype.setTrack = function(track) {
        this.track = track;
      };

      TrackLeaderboardCollection.prototype.setType = function(type) {
        this.type = type;
      };

      TrackLeaderboardCollection.prototype.setLevel = function(level) {
        this.level = level;
      };

      TrackLeaderboardCollection.prototype.setTotal = function(total) {
        this.total = total;
      };

      TrackLeaderboardCollection.prototype.getTotal = function() {
        return this.total;
      };

      return TrackLeaderboardCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.TrackLeaderboardCollection = TrackLeaderboardCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, LeaderboardCollection, _ref;
    LeaderboardCollection = (function(_super) {
      __extends(LeaderboardCollection, _super);

      function LeaderboardCollection() {
        return LeaderboardCollection.__super__.constructor.apply(this, arguments);
      }

      LeaderboardCollection.prototype.initialize = function(options) {
        var profile;
        this.limit = $.cookie('pagination_per_page_limit') || 10;
        LeaderboardCollection.__super__.initialize.call(this, options);
        return profile = HR.profile();
      };

      LeaderboardCollection.prototype.validFilters = ['network', 'school', 'company', 'country', 'language'];

      LeaderboardCollection.prototype.showLoader = false;

      LeaderboardCollection.prototype.namespace = "";

      LeaderboardCollection.prototype.baseURL = function() {
        var prefix;
        prefix = "";
        if (this.track) {
          prefix = "" + prefix + "tags/" + this.track.slug + "/";
        }
        if (this.challenge) {
          prefix = "" + prefix + "challenges/" + (this.challenge.get('slug')) + "/";
        }
        if (this.language) {
          prefix = "" + prefix + "language/" + this.language + "/";
        }
        return "" + prefix + "leaderboard";
      };

      LeaderboardCollection.prototype.challengesURL = function() {
        return "" + (this.restURL()) + "/challenges";
      };

      LeaderboardCollection.prototype.collectionCrumbs = function() {
        var crumbs;
        crumbs = HR.collection('bread-crumbs');
        if (this.track) {
          crumbs.add({
            id: "Track-" + this.track,
            slug: this.track.slug,
            name: this.track.name
          });
        }
        if (this.challenge) {
          crumbs.merge(this.challenge.modelCrumbs());
        }
        if (this.language) {
          crumbs.add({
            id: this.language,
            slug: this.language,
            name: lang_display_mapping[this.language]
          });
        }
        return crumbs;
      };

      LeaderboardCollection.prototype.url = function() {
        var query, url;
        this.limit || (this.limit = 10);
        this.page || (this.page = 1);
        url = this.restURL();
        if (this.filtered() && this.hasFilters()) {
          url += "/filter";
        }
        query = this.queryParams();
        if (this.archived) {
          query += "&archived=true";
        }
        if (this.includePractice) {
          query += "&include_practice=true";
        }
        if (this.level) {
          query += "&level=" + this.level;
        }
        return "" + url + "?" + query;
      };

      LeaderboardCollection.prototype.challenges = function(callback) {
        var that;
        if (callback == null) {
          callback = null;
        }
        that = this;
        $.getJSON(that.challengesURL(), function(response) {
          that._challenges = response;
          if (typeof callback === "function") {
            return callback(response);
          }
        });
        return this._challenges;
      };

      LeaderboardCollection.prototype.metaKeys = ['current_hacker', 'total', 'available', 'contest_challenges', 'weekly_contest'];

      LeaderboardCollection.prototype.parse = function(resp, xhr) {
        var that;
        that = this;
        this.current_hacker = resp.current_hacker;
        this.available = resp.available;
        this.contest_challenges = resp.contest_challenges;
        this.weekly_contest = resp.weekly_contest;
        return LeaderboardCollection.__super__.parse.call(this, resp, xhr);
      };

      LeaderboardCollection.prototype.setContestSlug = function(contest_slug) {
        this.contest_slug = contest_slug;
      };

      LeaderboardCollection.prototype.setTrack = function(track_slug) {
        var that;
        that = this;
        return HR.model('contest').cached({
          success: (function(_this) {
            return function(contest) {
              var track;
              track = contest.getTrack(track_slug);
              if (track) {
                _this.track_slug = track_slug;
              }
              return _this.track = track;
            };
          })(this)
        });
      };

      LeaderboardCollection.prototype.setTrackLeaderboard = function() {
        return this.setKind("track");
      };

      LeaderboardCollection.prototype.setChallenge = function(challenge_slug) {
        var that;
        that = this;
        this.challenge_slug = challenge_slug;
        this.challenge = HR.model('challenge', {
          slug: challenge_slug,
          contest_slug: this.contest_slug
        }).cached();
        return this.listenToOnce(this.challenge, 'reset', function() {
          return that.trigger('reset');
        });
      };

      LeaderboardCollection.prototype.setChallengeLeaderboard = function() {
        this.disableFilter('challenge');
        this.namespace = "/challenges/" + this.challenge_slug;
        return this.setKind("challenge");
      };

      LeaderboardCollection.prototype.setLanguage = function(language) {
        return this.language = language;
      };

      LeaderboardCollection.prototype.setLanguageLeaderboard = function() {
        this.namespace += "/language/" + this.language;
        this.disableFilter('language');
        return this.setKind("language");
      };

      LeaderboardCollection.prototype.setKind = function(kind) {
        this.kind = kind;
        this.filters = {};
        return this.trigger('change');
      };

      LeaderboardCollection.prototype.setLimit = function(limit) {
        this.limit = limit;
      };

      LeaderboardCollection.prototype.setArchived = function(archived) {
        this.archived = archived;
      };

      LeaderboardCollection.prototype.pageURL = function() {
        var url;
        url = LeaderboardCollection.__super__.pageURL.call(this);
        if (this.archived) {
          url = "classic_leaderboard";
        }
        if (this.track) {
          url = url.replace("/tags/", "/tracks/");
        }
        if (this.level) {
          return "/leaderboard/level/" + this.level + "/page";
        } else if (this.filtered()) {
          return "" + url + "/filter/" + (this.getFilterString());
        } else {
          return "" + url;
        }
      };

      LeaderboardCollection.prototype.route = function() {
        HR.router.navigate(this.pageURL(), true);
        return this.trigger('reset');
      };

      LeaderboardCollection.prototype.setPage = function(page) {
        return this.page = page;
      };

      LeaderboardCollection.prototype.getTotal = function() {
        return this.total;
      };

      LeaderboardCollection.prototype.getCurrentPage = function() {
        return this.page;
      };

      LeaderboardCollection.prototype.setIncludePractice = function(includePractice) {
        this.includePractice = includePractice;
      };

      LeaderboardCollection.prototype.setLevel = function(level) {
        this.level = level;
      };

      return LeaderboardCollection;

    })(window.HR.GenericLeaderboardCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.LeaderboardCollection = LeaderboardCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var CampusRepStatsCollection, HR, _ref;
    CampusRepStatsCollection = (function(_super) {
      __extends(CampusRepStatsCollection, _super);

      function CampusRepStatsCollection() {
        return CampusRepStatsCollection.__super__.constructor.apply(this, arguments);
      }

      CampusRepStatsCollection.prototype.url = function() {
        return "/rest/campus_rep_hackers";
      };

      return CampusRepStatsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.CampusRepStatsCollection = CampusRepStatsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_ChallengesCollection, HR, _ref;
    Administration_ChallengesCollection = (function(_super) {
      __extends(Administration_ChallengesCollection, _super);

      function Administration_ChallengesCollection() {
        return Administration_ChallengesCollection.__super__.constructor.apply(this, arguments);
      }

      Administration_ChallengesCollection.prototype.url = function() {
        var url;
        url = "/rest/administration";
        if (this.contest_id) {
          url += "/contests/" + this.contest_id;
        }
        return url += "/challenges?" + (this.queryParams());
      };

      Administration_ChallengesCollection.prototype.baseURL = function() {
        var url;
        url = "administration";
        if (this.contest_id) {
          url += "/contests/edit/" + this.contest_id;
        }
        url += "/challenges/";
        if (this.query) {
          url += "query/" + this.query + "/";
        }
        return url += "page/";
      };

      Administration_ChallengesCollection.prototype.setContestId = function(contest_id) {
        this.contest_id = contest_id;
      };

      Administration_ChallengesCollection.prototype.setQuery = function(query) {
        this.query = query;
      };

      return Administration_ChallengesCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.Administration_ChallengesCollection = Administration_ChallengesCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_CompaniesCollection, HR, _ref;
    Administration_CompaniesCollection = (function(_super) {
      __extends(Administration_CompaniesCollection, _super);

      function Administration_CompaniesCollection() {
        return Administration_CompaniesCollection.__super__.constructor.apply(this, arguments);
      }

      Administration_CompaniesCollection.prototype.url = function() {
        var url;
        url = "/rest/administration";
        if (this.contest_id) {
          url += "/contests/" + this.contest_id;
        }
        return url += "/companies?" + (this.queryParams());
      };

      Administration_CompaniesCollection.prototype.baseURL = function() {
        var url;
        url = "administration";
        if (this.contest_id) {
          url += "/contests/edit/" + this.contest_id;
        }
        url += "/companies/";
        if (this.query) {
          url += "query/" + this.query + "/";
        }
        return url += "page/";
      };

      Administration_CompaniesCollection.prototype.setContestId = function(contest_id) {
        this.contest_id = contest_id;
      };

      Administration_CompaniesCollection.prototype.setQuery = function(query) {
        this.query = query;
      };

      return Administration_CompaniesCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.Administration_CompaniesCollection = Administration_CompaniesCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_CompanyContestsCollection, HR, _ref;
    Administration_CompanyContestsCollection = (function(_super) {
      __extends(Administration_CompanyContestsCollection, _super);

      function Administration_CompanyContestsCollection() {
        return Administration_CompanyContestsCollection.__super__.constructor.apply(this, arguments);
      }

      Administration_CompanyContestsCollection.prototype.url = function() {
        var url;
        return url = "/rest/administration/companies/" + this.company_id + "/contests";
      };

      return Administration_CompanyContestsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.Administration_CompanyContestsCollection = Administration_CompanyContestsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_ContestsCollection, HR, _ref;
    Administration_ContestsCollection = (function(_super) {
      __extends(Administration_ContestsCollection, _super);

      function Administration_ContestsCollection() {
        return Administration_ContestsCollection.__super__.constructor.apply(this, arguments);
      }

      Administration_ContestsCollection.prototype.url = function() {
        return "/rest/administration/contests?" + (this.queryParams());
      };

      Administration_ContestsCollection.prototype.baseURL = function() {
        var url;
        url = 'administration/contests/';
        if (this.query) {
          url += "query/" + this.query + "/";
        }
        return url += 'page/';
      };

      Administration_ContestsCollection.prototype.setQuery = function(query) {
        this.query = query;
      };

      return Administration_ContestsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.Administration_ContestsCollection = Administration_ContestsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_HackerboardCollection, HR, _ref;
    Administration_HackerboardCollection = (function(_super) {
      __extends(Administration_HackerboardCollection, _super);

      function Administration_HackerboardCollection() {
        return Administration_HackerboardCollection.__super__.constructor.apply(this, arguments);
      }

      Administration_HackerboardCollection.prototype.url = function() {
        return "/rest/administration/companies/" + this.company_id + "/contests/" + this.contest_id + "/hackerboard?" + (this.queryParams());
      };

      Administration_HackerboardCollection.prototype.baseURL = function() {
        return "administration/companies/edit/" + this.company_id + "/applicants/" + this.contest_id + "/page/";
      };

      return Administration_HackerboardCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.Administration_HackerboardCollection = Administration_HackerboardCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_HackerboardSubmissionsCollection, HR, _ref;
    Administration_HackerboardSubmissionsCollection = (function(_super) {
      __extends(Administration_HackerboardSubmissionsCollection, _super);

      function Administration_HackerboardSubmissionsCollection() {
        return Administration_HackerboardSubmissionsCollection.__super__.constructor.apply(this, arguments);
      }

      Administration_HackerboardSubmissionsCollection.prototype.url = function() {
        return "/rest/administration/companies/" + this.company_id + "/contests/" + this.contest_id + "/hackers/" + this.hacker_id + "/hackerboard/submissions";
      };

      return Administration_HackerboardSubmissionsCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.Administration_HackerboardSubmissionsCollection = Administration_HackerboardSubmissionsCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var Administration_TestCasesCollection, HR, _ref;
    Administration_TestCasesCollection = (function(_super) {
      __extends(Administration_TestCasesCollection, _super);

      function Administration_TestCasesCollection() {
        return Administration_TestCasesCollection.__super__.constructor.apply(this, arguments);
      }

      Administration_TestCasesCollection.prototype.url = function() {
        return "/rest/administration/challenges/" + this.challenge_id + "/test_cases";
      };

      return Administration_TestCasesCollection;

    })(window.HR.GenericCollection);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.Administration_TestCasesCollection = Administration_TestCasesCollection;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  jQuery(function() {
    var DashboardRouter, HR, _ref;
    DashboardRouter = (function(_super) {
      __extends(DashboardRouter, _super);

      function DashboardRouter() {
        return DashboardRouter.__super__.constructor.apply(this, arguments);
      }

      DashboardRouter.prototype.routes = {
        "": "default_route",
        "_=_": "default_route",
        "blog/new": "writeblog",
        "blog/*path": "redirectBlog",
        "blog": "redirectBlog",
        "blog/": "redirectBlog",
        "oldblog/:id": "singlepost",
        "oldblog/:id/": "singlepost",
        "oldblog/page/:page": "blogindex",
        "oldblog/": "blogindex",
        "oldblog": "blogindex",
        "oldblog/index/": "blogindex",
        "oldblog/index": "blogindex",
        "oldblog/:id/edit": "edit_blog",
        "oldblog/:id/edit/": "edit_blog",
        "dashboard": "dashboard",
        "contests/:contest_slug/dashboard": "dashboard",
        "contests/project-euler/challenges": "specialRedirect",
        "contests/project-euler/challenges/": "specialRedirect",
        "contests/project-euler/challenges/*path": "specialRedirect",
        "challenges/:challenge_slug/submissions": "challengeSubmissions",
        "contests/:contest_slug/challenges/:challenge_slug/submissions": "challengeSubmissions",
        "challenges/:challenge_slug/submissions/": "challengeSubmissions",
        "contests/:contest_slug/challenges/:challenge_slug/submissions/": "challengeSubmissions",
        "challenges/:challenge_slug/submissions/:page": "challengeSubmissions",
        "contests/:contest_slug/challenges/:challenge_slug/submissions/:page": "challengeSubmissions",
        "challenges/:challenge_hash/editorial": "editorial",
        "contests/:contest_slug/challenges/:challenge_hash/editorial": "editorial",
        "challenges/:challenge_hash/forum/questions": "questions",
        "contests/:contest_slug/challenges/:challenge_hash/forum/questions": "questions",
        "challenges/:challenge_hash/forum/questions/page/:page": "questions",
        "contests/:contest_slug/challenges/:challenge_hash/forum/questions/page/:page": "questions",
        "challenges/:challenge_hash/forum/questions/ask": "askQuestion",
        "contests/:contest_slug/challenges/:challenge_hash/forum/questions/ask": "askQuestion",
        "challenges/:challenge_hash/forum/questions/ask/:question_id": "askQuestion",
        "contests/:contest_slug/challenges/:challenge_hash/forum/questions/ask/:question_id": "askQuestion",
        "challenges/:challenge_hash/forum/questions/:question_id": "questions",
        "contests/:contest_slug/challenges/:challenge_hash/forum/questions/:question_id": "questions",
        "leaderboard": "trackLeaderboard",
        "leaderboard/:track": "trackLeaderboard",
        "leaderboard/:track/:type": "trackLeaderboard",
        "leaderboard/:track/:type/level/:level": "trackLeaderboard",
        "leaderboard/:track/:type/level/:level/page/:page": "trackLeaderboard",
        "leaderboard/:track/:type/level/:level/filter/:filterString/page/:page": "filteredTrackLeaderboard",
        "archived_leaderboard": "archivedLeaderboard",
        "archived_leaderboard/:page": "archivedLeaderboard",
        "classic_leaderboard": "archivedLeaderboard",
        "classic_leaderboard/:page": "archivedLeaderboard",
        "classic_leaderboard/filter/:filterString": "archivedFilterLeaderboard",
        "classic_leaderboard/filter/:filterString/:page": "archivedFilterLeaderboard",
        "contests/:contest_slug/leaderboard": "defaultLeaderboard",
        "contests/:contest_slug/leaderboard/": "defaultLeaderboard",
        "contests/:contest_slug/leaderboard/:page": "defaultLeaderboard",
        "contests/:contest_slug/leaderboard/filter/:filterString": "filterLeaderboard",
        "contests/:contest_slug/leaderboard/filter/:filterString/:page": "filterLeaderboard",
        "challenges/:challenge_slug/leaderboard": "masterChallengeLeaderboard",
        "challenges/:challenge_slug/leaderboard/:page": "masterChallengeLeaderboard",
        "challenges/:challenge_slug/leaderboard/filter/:filterString": "masterFilterChallengeLeaderboard",
        "challenges/:challenge_slug/leaderboard/filter/:filterString/:page": "masterFilterChallengeLeaderboard",
        "contests/:contest_slug/challenges/:challenge_slug/leaderboard": "challengeLeaderboard",
        "contests/:contest_slug/challenges/:challenge_slug/leaderboard/:page": "challengeLeaderboard",
        "contests/:contest_slug/challenges/:challenge_slug/leaderboard/filter/:filterString": "filterChallengeLeaderboard",
        "contests/:contest_slug/challenges/:challenge_slug/leaderboard/filter/:filterString/:page": "filterChallengeLeaderboard",
        "challenges/:challenge_slug/language/:language/leaderboard": "languageLeaderboard",
        "challenges/:challenge_slug/language/:language/leaderboard/:page": "languageLeaderboard",
        "challenges/:challenge_slug/language/:language/leaderboard/filter/:filterString": "filterLanguageLeaderboard",
        "challenges/:challenge_slug/language/:language/leaderboard/filter/:filterString/:page": "filterLanguageLeaderboard",
        "contests/:contest_slug/challenges/:challenge_slug/language/:language/leaderboard": "languageLeaderboard",
        "contests/:contest_slug/challenges/:challenge_slug/language/:language/leaderboard/:page": "languageLeaderboard",
        "contests/:contest_slug/challenges/:challenge_slug/language/:language/leaderboard/filter/:filterString": "filterLanguageLeaderboardfilter",
        "contests/:contest_slug/challenges/:challenge_slug/language/:language/leaderboard/filter/:filterString/:page": "filterLanguageLeaderboard",
        "categories": "categoriesRedirect",
        "categories/:category": "topCategoryRedirect",
        "categories/:track/contests": "trackContests",
        "categories/:track/contests/:contest_slug": "trackContests",
        "categories/:category/:track": "categoryChallengesList",
        "categories/:category/:track/sort/:sort_by": "categoryChallengesList",
        "categories/:category/:track/challenges/page/:page": "categoryChallengesList",
        "categories/:category/:track/challenges/sort/:sort_by/page/:page": "categoryChallengesList",
        "contests/:contest_slug/categories": "categoriesRedirect",
        "contests/:contest_slug/categories/:category": "topCategoryRedirect",
        "contests/:contest_slug/categories/:category/:track": "categoryChallengesList",
        "contests/:contest_slug/categories/:category/:track/sort/:sort_by": "categoryChallengesList",
        "contests/:contest_slug/categories/:category/:track/challenges(/filter/:filter)(/sort/:sort_by)(/dir/:direction)(/page/:page)": "filteredCategoryChallengesList",
        "contests/:contest_slug/categories/:category/:track/challenges/page/:page": "categoryChallengesList",
        "contests/:contest_slug/categories/:category/:track/challenges/sort/:sort_by/page/:page": "categoryChallengesList",
        "challenges": "categoriesRedirect",
        "contests/:contest_slug/challenges": "contestChallengesList",
        "contests/:contest_slug/challenges/filter/:filter": "contestChallengesList",
        "contests/:contest_slug/challenges/page/:page": "contestChallengesList",
        "contests/:contest_slug/challenges/filter/:filter/page/:page/": "contestChallengesList",
        "challenges/:challenge_hash": "challenges",
        "contests/:contest_slug/challenges/:challenge_hash": "challenges",
        "leaderboard/nvn": "nvnLeaderboard",
        "contests/:contest_slug/leaderboard/nvn": "nvnLeaderboard",
        "leaderboard/nvn/:page": "nvnLeaderboard",
        "contests/:contest_slug/leaderboard/nvn/:page": "nvnLeaderboard",
        "leaderboard/nvn/kind/:kind": "nvnKindLeaderboard",
        "contests/:contest_slug/leaderboard/nvn/kind/:kind": "nvnKindLeaderboard",
        "leaderboard/nvn/kind/:kind/:page": "nvnKindLeaderboard",
        "contests/:contest_slug/leaderboard/nvn/kind/:kind/:page": "nvnKindLeaderboard",
        "leaderboard/:kind/:value": "networkLeaderboard",
        "contests/:contest_slug/leaderboard/:kind/:value": "networkLeaderboard",
        "leaderboard/:kind/:value/:page": "networkLeaderboard",
        "contests/:contest_slug/leaderboard/:kind/:value/:page": "networkLeaderboard",
        "submissions": "submissions",
        "contests/:contest_slug/submissions": "submissions",
        "contests/:contest_slug/judge/submissions": "judge_contest_submissions",
        "contests/:contest_slug/judge/submissions/:page": "judge_contest_submissions",
        "contests/:contest_slug/challenges/:challenge_slug/judge/submissions": "judge_submissions",
        "contests/:contest_slug/challenges/:challenge_slug/judge/submissions/:page": "judge_submissions",
        "contests/:contest_slug/judge/submissions/team/:team_slug": "judge_team_submissions",
        "contests/:contest_slug/judge/submissions/team/:team_slug/:page": "judge_team_submissions",
        "contests/:contest_slug/judge/submissions/challenge/:challenge_slug": "judge_challenge_submissions",
        "contests/:contest_slug/judge/submissions/challenge/:challenge_slug/:page": "judge_challenge_submissions",
        "submissions/:kind": "submissions",
        "contests/:contest_slug/submissions/:kind": "submissions",
        "submissions/:kind/page/:page": "submissions",
        "contests/:contest_slug/submissions/:kind/page/:page": "submissions",
        "submissions/:kind/:submissions_id": "submission",
        "contests/:contest_slug/submissions/:kind/:submissions_id": "submission",
        "submissions/:kind/:submissions_id/:_filter": "submission",
        "contests/:contest_slug/submissions/:kind/:submissions_id/:_filter": "submission",
        "submissions/:kind/:submissions_id/:element/:element_id": "submission",
        "contests/:contest_slug/submissions/:kind/:submissions_id/:element/:element_id": "submission",
        "submissions/:kind/:submissions_id/:_filter/:element/:element_id": "submission",
        "contests/:contest_slug/submissions/:kind/:submissions_id/:_filter/:element/:element_id": "submission",
        "playoffs/:challenge_hash/round/:round_id": "playoffs",
        "contests/:contest_slug/playoffs/:challenge_hash/round/:round_id": "playoffs",
        "checklist/:challenge_slug": "checklist",
        "contests/:contest_slug/checklist/:challenge_slug": "checklist",
        "scoring": "scoring",
        "contests/:contest_slug/scoring": "scoring",
        "scoring/:section": "scoring",
        "contests/:contest_slug/scoring/:section": "scoring",
        "problemsetter": "problemsetter",
        "problemsetter/:section": "problemsetter",
        "companies": "companies",
        "companies/:slug": "companies",
        "administration": "administration_redirect",
        "administration/:resource": "administration_resource_list",
        "administration/:resource/page/:page": "administration_resource_list",
        "administration/:resource/query/:query": "administration_resource_list",
        "administration/:resource/query/:query/page/:page": "administration_resource_list",
        "administration/contests/:action": "administration_contest_edit",
        "administration/contests/:action/:contest_id": "administration_contest_edit",
        "administration/contests/:action/:contest_id/:tab": "administration_contest_edit",
        "administration/contests/edit/:contest_id/challenges/page/:page": "administration_contest_edit_challenges",
        "administration/contests/edit/:contest_id/challenges/:action": "administration_contest_challenge_edit",
        "administration/contests/edit/:contest_id/challenges/:action/:challenge_id": "administration_contest_challenge_edit",
        "administration/contests/edit/:contest_id/challenges/:action/:challenge_id/:tab": "administration_contest_challenge_edit",
        "administration/challenges/:action": "administration_challenge_edit",
        "administration/challenges/:action/:challenge_id": "administration_challenge_edit",
        "administration/challenges/:action/:challenge_id/:tab": "administration_challenge_edit",
        "administration/companies/:action": "administration_company_edit",
        "administration/companies/:action/:company_id": "administration_company_edit",
        "administration/companies/:action/:company_id/:tab": "administration_company_edit",
        "administration/companies/:action/:company_id/:tab/:tab_id": "administration_company_edit",
        "administration/companies/:action/:company_id/:tab/:tab_id/page/:page": "administration_company_edit",
        "administration/companies/:action/:company_id/:tab/:tab_id/page/:page/hackers/:hacker_id": "administration_company_edit",
        "manage": "manage_home",
        "manage/": "manage_home",
        "manage/challenge": "manage_challenge",
        "manage/challenge/": "manage_challenge",
        "manage/challenge/:page": "manage_challenge",
        "manage/challenge/edit/:id": "edit_challenge",
        "manage/challenge/edit/:id/:tabm": "edit_challenge",
        "manage/challenge/edit/:id/:tabm/": "edit_challenge",
        "manage/challenge/:filter/:page": "manage_challenge_filtered",
        "manage/template/edit/:id": "edit_template",
        "manage/contest": "manage_contest",
        "manage/contest/": "manage_contest",
        "manage/contest/new": "new_contest",
        "manage/contest/new/": "new_contest",
        "manage/contest/:page": "manage_contest",
        "manage/contest/edit/:id": "edit_contest",
        "manage/contest/edit/:id/": "edit_contest",
        "manage/contest/notifications/:contest_slug": "manage_notification",
        "manage/contest/notifications/:contest_slug/": "manage_notification",
        "manage/contest/edit/:id/:tabm": "edit_contest",
        "manage/contest/edit/:id/:tabm/": "edit_contest",
        "hackerclubs/:country": "hackerclubs",
        "apply/confirm_profile": "hacker_application_upload_profile",
        "apply/:slug/confirm_profile": "hacker_application_upload_profile",
        "contests/:contest_slug/apply/confirm_profile": "hacker_application_upload_profile",
        "contests/:contest_slug/apply/:challenge_slug/confirm_profile": "hacker_application_upload_profile",
        "challenges/:challenges_slug/apply/confirm_profile": "hacker_application_upload_profile",
        "challenges/:challenges_slug/apply/:slug/confirm_profile": "hacker_application_upload_profile",
        "contests/:contest_slug/challenges/:contest_slug/apply/confirm_profile": "hacker_application_upload_profile",
        "contests/:contest_slug/challenges/:contest_slug/apply/:slug/confirm_profile": "hacker_application_upload_profile",
        "apply": "hacker_application",
        "apply/:slug": "hacker_application",
        "contests/:contest_slug/apply": "hacker_application",
        "contests/:contest_slug/apply/:challenge_slug": "hacker_application",
        "challenges/:challenges_slug/apply": "hacker_application",
        "challenges/:challenges_slug/apply/:slug": "hacker_application",
        "contests/:contest_slug/challenges/:contest_slug/apply": "hacker_application",
        "contests/:contest_slug/challenges/:contest_slug/apply/:slug": "hacker_application",
        "manage/applications": "manage_applications",
        "manage/applications/": "manage_applications",
        "manage/applications/:company_slug": "manage_applications",
        "manage/applications/:company_slug/": "manage_applications",
        "manage/applications/:company_slug/:filter/:page": "manage_applications",
        "manage/:contest_slug/applications": "manage_applications",
        "manage/:contest_slug/applications/": "manage_applications",
        "manage/:contest_slug/applications/:company_slug": "manage_applications",
        "manage/:contest_slug/applications/:company_slug/": "manage_applications",
        "manage/:contest_slug/applications/:company_slug/:filter/:page": "manage_applications",
        "manage/contests/:contest_slug/all_submissions": "admin_submissions",
        "manage/contests/:contest_slug/all_submissions/": "admin_submissions",
        "manage/contests/:contest_slug/all_submissions/:page": "admin_submissions",
        "manage/contests/:contest_slug/all_submissions/:filter": "admin_submissions",
        "manage/contests/:contest_slug/all_submissions/:filter/": "admin_submissions",
        "manage/contests/:contest_slug/all_submissions/:filter/:page": "admin_submissions",
        "applications/:key": "company_applications",
        "applications/:key/": "company_applications",
        "applications/:key/:filter/:page": "company_applications",
        "contests/:contest_slug/applications/:key": "company_applications",
        "contests/:contest_slug/applications/:key/": "company_applications",
        "contests/:contest_slug/applications/:key/:filter/:page": "company_applications",
        "teams/create": "teams_create",
        "contests/:contest_slug/teams/create": "teams_create",
        "teams/:team_id/:action": "teams",
        "contests/:contest_slug/teams/:team_id/:action": "teams",
        "teams/:team_id": "teams",
        "contests/:contest_slug/teams/:team_id": "teams",
        "teams": "teams",
        "contests/:contest_slug/teams": "teams",
        "careers": "careers",
        "careers/:position": "careers",
        "calendar": "calendar",
        "faq": "faq",
        "api": "apihome",
        "api/docs": "api",
        "contests/:contest_slug/faq": "faq",
        "faq/:tab": "faq",
        "contests/:contest_slug/faq/:tab": "faq",
        "environment": "environment",
        "contests/:contest_slug/environment": "environment",
        "environment/:tab": "environment",
        "contests/:contest_slug/environment/:tab": "environment",
        "contests/:contest_slug/settings": "settings",
        "contests/:contest_slug/settings/:tab": "settings",
        "settings": "settings",
        "settings/:tab": "settings",
        "contests/:contest_slug/showgame/:game_id": "showgame",
        "notifications": "notifications",
        "notifications/page/:page": "notificationsPage",
        "notifications/notif_id/:id": "notificationsSingle",
        "contests/:contest_slug/notifications": "notifications",
        "showgame/:game_id": "showgame",
        "sampletemplate": "sampletemplate",
        "sampletemplate1": "sampletemplate1",
        "sampletemplate2": "sampletemplate2",
        "sampletemplate3": "sampletemplate3",
        "sampletemplate/:template": "sample_template_generic",
        "sampletemplate/recruit/:template": "sample_recruit_generic",
        "privacy": "privacy",
        "inbox": "inbox",
        "inbox/": "inbox",
        "inbox/thread/:thread_id": "inbox",
        "inbox/thread/:thread_id/": "inbox",
        "contests": "contests",
        "contests/": "contests",
        "contests/:contest_slug": "contests",
        "contests/:contest_slug/": "contests",
        "contests/:contest_slug/:page": "contests",
        "ai": "categoriesRedirect",
        "algorithm": "categoriesRedirect",
        "golf": "categoriesRedirect",
        "weekly": "categoriesRedirect",
        ":contest_slug/leaderboard*i": "contestsLegacyRedirect",
        ":contest_slug/challenges*i": "contestsLegacyRedirect",
        ":contest_slug/submissions*i": "contestsLegacyRedirect",
        "gamedetails/:id": "gameDetails",
        ":hacker_slug/hackos": "hackerHackos",
        ":hacker_slug/hackos/": "hackerHackos",
        ":hacker_slug/hackos/page/:page": "hackerHackos",
        ":hacker_slug/hackos/page/:page/": "hackerHackos",
        ":slug": "vanity",
        ":slug/": "vanity",
        "tests/login/:unique_id": "recruit_candidate_outer",
        "tests/login/:unique_id/:authkey": "recruit_candidate_outer",
        "tests/:aid/page/:page": "recruit_candidate_inner",
        "tests/:aid/page/:page/:qid": "recruit_candidate_inner",
        "*i": "e404"
      };

      DashboardRouter.prototype.initialize = function() {
        var that;
        HR.appView = new HR.AppView;
        HR.fellowHacker = HR.fellowHacker || {};
        window.mixpanel_data = {
          landing: true,
          contest: "",
          challenge: ""
        };
        that = this;
        Backbone.history.loadUrl = function(fragmentOverride) {
          var fragment, matched;
          fragment = this.fragment = this.getFragment(fragmentOverride);
          if (fragment.indexOf("?") !== -1) {
            fragment = fragment.split("?")[0];
          }
          HR.appView.setLoadingView();
          matched = _.any(this.handlers, function(handler) {
            if (handler.route.test(fragment)) {
              handler.callback(fragment);
              return true;
            }
          });
          return matched;
        };
        Backbone.history.bind("route", function(router, name, args, d) {
          var fragment, title;
          that.log(arguments);
          mixpanel.push([
            'track', "Navigation", {
              username: HR.profile().get('username'),
              url: window.location.pathname
            }
          ]);
          HR.util.scrollToTop();
          title = $('title').html();
          fragment = document.location.pathname;
          if (typeof pSUPERFLY !== "undefined" && typeof pSUPERFLY.virtualPage !== "undefined" && fragment !== '') {
            pSUPERFLY.virtualPage(fragment, title);
          }
          window.mixpanel_data = {};
          _gaq.push(['_trackPageview', '/' + fragment]);
          this.current_fragment = fragment;
          HR.current_page = fragment;
          if (typeof pSUPERFLY !== "undefined") {
            pSUPERFLY.virtualPage(fragment, title);
          }
          if (HR.appView && HR.appView.navigationView && HR.appView.navigationView.nav_login_patch) {
            HR.appView.navigationView.nav_login_patch.setTeamName();
          }
          return this;
        });
        return DashboardRouter.__super__.initialize.apply(this, arguments);
      };

      DashboardRouter.prototype.log = Backbone.log;

      DashboardRouter.prototype.route = function(route, name, callback) {
        if (!_.isRegExp(route)) {
          route = this._routeToRegExp(route);
        }
        if (!callback) {
          callback = this[name];
        }
        Backbone.history || (Backbone.history = new Backbone.History);
        Backbone.history.route(route, _.bind(function(fragment) {
          var args;
          route = new RegExp(route.toString().split("([?]|[?][^?]*|)").join("").slice(1, -1));
          args = this._extractParameters(route, fragment);
          callback && callback.apply(this, args);
          this.trigger.apply(this, ['route:' + name].concat(args));
          this.trigger('route', name, args);
          return Backbone.history.trigger('route', this, name, args);
        }, this));
        return this;
      };

      DashboardRouter.prototype._routeToRegExp = function(route) {
        route = route.replace(/[\-{}\[\]+?.,\\\^$|\#\s]/g, '\\$&').replace(/\((.*?)\)/g, '(?:$1)?').replace(/(\(\?)?:\w+/g, '([^\/]+)').replace(/\*\w+/g, '(.*?)');
        return new RegExp('^' + route + '([\?]|[\?][^?]*|)' + '$');
      };

      DashboardRouter.prototype.default_route = function() {
        HR.appController.set_contest_namespace("master");
        return this.navigate("/challenges", {
          trigger: true,
          replace: true
        });
      };

      DashboardRouter.prototype.hackerclubs = function(country) {
        var hacker_clubs;
        if (country == null) {
          country = "";
        }
        hacker_clubs = new HR.HackerClubCollection('hacker-club');
        hacker_clubs.slug = country;
        hacker_clubs.cached();
        return HR.requires(['compound/extra-views'], function() {
          var hacker_clubs_view;
          hacker_clubs_view = new HR.HackerClubsView({
            collection: hacker_clubs
          });
          return HR.appView.setContentView(hacker_clubs_view);
        });
      };

      DashboardRouter.prototype.dashboard = function() {
        return HR.requires(['compound/profile-views'], function() {
          var dashboardView;
          dashboardView = new HR.DashboardView;
          return HR.appView.setContentView(dashboardView);
        });
      };

      DashboardRouter.prototype.sample_template_generic = function(template) {
        return HR.requires(['compound/extra-views'], function() {
          var sampletemplate_view;
          sampletemplate_view = new HR.SampleTemplateView({
            template: template
          });
          return HR.appView.setContentView(sampletemplate_view);
        });
      };

      DashboardRouter.prototype.sample_recruit_generic = function(template) {
        return HR.requires(['compound/extra-views'], function() {
          var sampletemplate_view;
          sampletemplate_view = new HR.SampleTemplateView({
            template: "recruit/" + template
          });
          return HR.appView.setContentView(sampletemplate_view);
        });
      };

      DashboardRouter.prototype.sampletemplate = function() {
        return HR.requires(['compound/extra-views'], function() {
          var sampletemplate_view;
          sampletemplate_view = new HR.SampleTemplateView({
            template: "sampletemplate"
          });
          return HR.appView.setContentView(sampletemplate_view);
        });
      };

      DashboardRouter.prototype.sampletemplate1 = function() {
        return HR.requires(['compound/extra-views'], function() {
          var playoff_view;
          playoff_view = new HR.SampleTemplate1View;
          return HR.appView.setContentView(playoff_view);
        });
      };

      DashboardRouter.prototype.recruit_candidate_outer = function(unique_id, authkey) {
        if (unique_id == null) {
          unique_id = null;
        }
        if (authkey == null) {
          authkey = null;
        }
        window.recruit_test_mode = true;
        return HR.requires(['compound/recruit-views'], function() {
          var candidate_view;
          candidate_view = new HR.RecruitCandidateLoginView({
            unique_id: unique_id,
            authkey: authkey
          });
          return HR.appView.setContentView(candidate_view);
        });
      };

      DashboardRouter.prototype.recruit_candidate_inner = function(aid, page, qid) {
        if (page == null) {
          page = 'list';
        }
        if (qid == null) {
          qid = null;
        }
        window.recruit_test_mode = true;
        return HR.requires(['compound/recruit-views'], function() {
          var candidate_view;
          if (page === "list") {
            candidate_view = new HR.RecruitCandidateListView({
              aid: aid
            });
          } else {
            candidate_view = new HR.RecruitCandidateQuestionView({
              aid: aid,
              qid: qid,
              page: page
            });
          }
          return HR.appView.setContentView(candidate_view);
        });
      };

      DashboardRouter.prototype.writeblog = function() {
        return HR.requires(['compound/extra-views'], function() {
          var blog_view;
          HR.appController.setTitle("Write Blog");
          blog_view = new HR.WriteblogView;
          return HR.appView.setContentView(blog_view);
        });
      };

      DashboardRouter.prototype.redirectBlog = function(path) {
        if (path) {
          return window.location = "http://blog.hackerrank.com/" + path;
        } else {
          return window.location = "http://blog.hackerrank.com/";
        }
      };

      DashboardRouter.prototype.singlepost = function(id) {
        var blog, hacker;
        blog = HR.model('blog', {
          'id': id
        }).cached();
        hacker = HR.profile();
        return HR.requires(['compound/extra-views'], function() {
          var singlepost_view;
          singlepost_view = new HR.SinglePostView({
            model: blog,
            current_hacker: hacker
          });
          return HR.appView.setContentView(singlepost_view);
        });
      };

      DashboardRouter.prototype.blogindex = function(page) {
        var blogs, hacker;
        if (page == null) {
          page = 1;
        }
        blogs = HR.collection('blogs');
        blogs.setPage(page);
        blogs.cached();
        hacker = HR.profile();
        HR.requires(['compound/extra-views'], function() {
          var blogindex_view;
          blogindex_view = new HR.BlogIndexView({
            collection: blogs,
            current_hacker: hacker
          });
          return HR.appView.setContentView(blogindex_view);
        });
        return HR.appController.setTitle("Blogs");
      };

      DashboardRouter.prototype.edit_blog = function(id) {
        var blog, current_hacker, key;
        key = "id-" + id;
        if (id === "new") {
          key = "id-" + id + "-" + (Math.round(Math.random() * 10000 + 100000));
        }
        blog = HR.model('blog', {
          id: id
        }).cached();
        current_hacker = HR.profile();
        HR.requires(['compound/extra-views'], function() {
          var blogadmin_view;
          blogadmin_view = new HR.BlogAdminView({
            model: blog,
            current_hacker: current_hacker
          });
          return HR.appView.setContentView(blogadmin_view);
        });
        return HR.appController.setTitle("Blogs-Edit");
      };

      DashboardRouter.prototype.battles = function() {
        var level_id;
        level_id = 3;
        return HR.requries('compound/game-views', function() {
          var battle_view;
          battle_view = new HR.BattleView({
            level: level_id
          });
          return HR.appView.setContentView(battle_view);
        });
      };

      DashboardRouter.prototype.playoffs = function(contest_slug, challenge_slug, round_id) {
        var fragment, fragments, that, _playoff_clbk;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (round_id == null) {
          round_id = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("playoffs");
        if (fragments[0] === "") {
          round_id = challenge_slug;
          challenge_slug = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        _playoff_clbk = function(collection) {
          collection.setSlug(challenge_slug);
          return collection.setRound(round_id);
        };
        return HR.requires(['compound/extra-views'], function() {
          this.playoff_view = new HR.PlayoffsView;
          this.playoff_view.setCollection(HR.collection('playoff', {
            slug: challenge_slug
          }).cached());
          this.playoff_view.setContest(HR.model("contest").cache());
          this.playoff_view.setChallenge(HR.model("challenge", {
            slug: challenge_slug
          }).cached());
          return HR.appView.setContentView(this.playoff_view);
        });
      };

      DashboardRouter.prototype.sampletemplate2 = function() {
        var sampletemplate_view;
        sampletemplate_view = new HR.SampleTemplate2View;
        return HR.appView.setContentView(sampletemplate_view);
      };

      DashboardRouter.prototype.privacy = function() {
        HR.requires(['compound/extra-views'], function() {
          var privacy_view;
          privacy_view = new HR.PrivacyView;
          return HR.appView.setContentView(privacy_view);
        });
        return window.mixpanel_data.landing = false;
      };

      DashboardRouter.prototype.careers = function(position) {
        if (position == null) {
          position = null;
        }
        HR.requires(['compound/extra-views'], function() {
          var careers_view;
          if (position === null) {
            position = "product-hacker";
          }
          careers_view = new HR.CareersView({
            position: position
          });
          HR.appView.setContentView(careers_view);
          return HR.appController.setTitle("Careers :: HackerRank");
        });
        return window.mixpanel_data.landing = false;
      };

      DashboardRouter.prototype.trackContests = function(track_slug, contest_slug) {
        var collection, contest, view;
        if (contest_slug == null) {
          contest_slug = null;
        }
        collection = new HR.ContestsCollection({
          key: 'active',
          track_slug: track_slug,
          contest_slug: contest_slug
        });
        contest = null;
        if (contest_slug && contest_slug !== "archived") {
          contest = new HR.ContestModel({
            slug: contest_slug
          }).cached();
        }
        view = new HR.TrackDashboardView({
          collection: collection.cached(),
          contest: contest,
          contest_slug: contest_slug,
          activeTab: 'contest',
          current_track_slug: track_slug
        });
        HR.appView.setContentView(view);
        HR.util.setTab('contests');
        HR.appController.setTitle("Contests");
        if (contest_slug === null) {
          HR.appController.set_contest_namespace("master");
        }
        return window.mixpanel_data.landing = false;
      };

      DashboardRouter.prototype.challengesList = function(page, track, contest_slug, as_track, category_slugs, filter, sort_by, sort_dir) {
        var challenges, challenges_view, contest, current_chapter_slug, current_track_slug, that, title, viewClass;
        if (page == null) {
          page = 1;
        }
        if (track == null) {
          track = null;
        }
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (as_track == null) {
          as_track = false;
        }
        if (category_slugs == null) {
          category_slugs = null;
        }
        if (filter == null) {
          filter = null;
        }
        if (sort_by == null) {
          sort_by = null;
        }
        if (sort_dir == null) {
          sort_dir = null;
        }
        that = this;
        title = "Challenges";
        contest_slug || (contest_slug = "master");
        this.log(page, track, contest_slug, as_track, category_slugs, filter);
        HR.appController.setTitle(title);
        contest = new HR.ContestModel({
          slug: contest_slug
        });
        contest.fetch({
          async: false
        });
        HR.appController.set_contest_namespace(contest.get('slug'));
        if (contest.get("has_tracks") && category_slugs === null) {
          this.categoriesRedirect(contest_slug);
          return;
        }
        challenges = HR.collection('challenges');
        challenges._filter = filter;
        if (filter) {
          challenges.setFilters(filter.split("+"));
        }
        challenges.setSortBy(sort_by);
        challenges.setSortDir(sort_dir);
        challenges.setContest(contest_slug);
        challenges.setPage(page);
        challenges.setCategories(category_slugs);
        challenges.setLoginTracking(true);
        challenges.limit = contest.get('challenges_per_page');
        challenges.cached();
        if ((category_slugs !== null) && (category_slugs.length > 1)) {
          current_track_slug = category_slugs[0];
        }
        if ((category_slugs !== null) && (category_slugs.length > 1)) {
          current_chapter_slug = category_slugs[1];
        }
        viewClass = null;
        if (contest_slug === 'master') {
          viewClass = HR.TrackDashboardView;
        } else {
          viewClass = HR.ChallengesView;
        }
        challenges_view = new viewClass({
          challenges: challenges,
          category_slugs: category_slugs,
          contest_slug: contest_slug,
          contest: contest,
          filter: filter,
          current_track_slug: current_track_slug,
          current_chapter_slug: current_chapter_slug,
          activeTab: 'challenge'
        });
        HR.appView.setContentView(challenges_view);
        HR.util.setTab('challenges');
        if (contest_slug === null) {
          contest_slug = "master";
        }
        HR.appController.set_contest_namespace(contest_slug);
        return window.mixpanel_data = {
          landing: false,
          contest: contest_slug,
          page_type: 'challengespage'
        };
      };

      DashboardRouter.prototype.contestChallengesList = function(contest_slug, page, filter, sort_by, sort_dir) {
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (page == null) {
          page = 1;
        }
        if (filter == null) {
          filter = null;
        }
        if (sort_by == null) {
          sort_by = null;
        }
        if (sort_dir == null) {
          sort_dir = null;
        }
        return this.challengesList(page, null, contest_slug, false, null, filter, sort_by, sort_dir);
      };

      DashboardRouter.prototype.filteredCategoryChallengesList = function(contest_slug, category, track, filter, sort_by, sort_dir, page) {
        var fragment, fragments;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (category == null) {
          category = null;
        }
        if (track == null) {
          track = null;
        }
        if (filter == null) {
          filter = null;
        }
        if (sort_by == null) {
          sort_by = null;
        }
        if (sort_dir == null) {
          sort_dir = null;
        }
        if (page == null) {
          page = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("categories");
        if (fragments[0] === "") {
          page = sort_dir;
          sort_dir = sort_by;
          sort_by = filter;
          filter = track;
          track = category;
          category = contest_slug;
          contest_slug = 'master';
        }
        page || (page = 1);
        return this.categoryChallengesList(contest_slug, category, track, page, filter, sort_by, sort_dir);
      };

      DashboardRouter.prototype.categoryChallengesList = function(contest_slug, category, track, page, filter, sort_by, sort_dir) {
        var category_slugs, fragment, fragments;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (category == null) {
          category = null;
        }
        if (track == null) {
          track = null;
        }
        if (page == null) {
          page = null;
        }
        if (filter == null) {
          filter = null;
        }
        if (sort_by == null) {
          sort_by = null;
        }
        if (sort_dir == null) {
          sort_dir = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("categories");
        if (fragments[0] === "") {
          sort_dir = sort_by;
          sort_by = filter;
          filter = page;
          page = track;
          track = category;
          category = contest_slug;
          contest_slug = 'master';
        }
        page || (page = 1);
        category_slugs = [category, track];
        $.cookie("hr_categories-" + contest_slug, _.compact(category_slugs), {
          path: '/'
        });
        return this.challengesList(page, null, contest_slug, false, category_slugs, filter, sort_by, sort_dir);
      };

      DashboardRouter.prototype.topCategoryRedirect = function(contest_slug, category) {
        var autoFillMissing, categories, category_slugs, contest, _contest;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (category == null) {
          category = null;
        }
        if (!category) {
          category = contest_slug;
          contest_slug = "master";
        }
        _contest = new HR.ContestModel({
          slug: contest_slug
        });
        contest = _contest.cached();
        category_slugs = [category];
        categories = contest.currentCategories(category_slugs, autoFillMissing = true);
        return this.navigate(categories.last().pageURL(), {
          trigger: true,
          replace: true
        });
      };

      DashboardRouter.prototype.categoriesRedirect = function(contest_slug) {
        var contest, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        contest_slug || (contest_slug = "master");
        that = this;
        contest = new HR.ContestModel({
          slug: contest_slug
        });
        return contest.cached({
          success: function(model) {
            var categories, category_slugs;
            HR.appController.set_contest_namespace(model.get('slug'));
            category_slugs = $.cookie("hr_categories-" + contest_slug) || model.categories().first().get("slug");
            if (category_slugs) {
              category_slugs = category_slugs.split(',');
            }
            categories = model.currentCategories(category_slugs);
            return HR.router.navigate(categories.last().pageURL(), {
              trigger: true,
              replace: true
            });
          }
        });
      };

      DashboardRouter.prototype.challenges = function(contest_slug, challenge_slug) {
        var fragment, fragments, model, options, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("challenges");
        if (fragments[0] === "") {
          challenge_slug = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        HR.util.setTab('challenge');
        options = {
          slug: challenge_slug,
          contest_slug: contest_slug
        };
        model = HR.model('challenge', options).cached();
        HR.requires(['compound/challenge-views'], function() {
          var challenge_view;
          challenge_view = new HR.ChallengeView({
            model: model,
            activeTab: 'problem'
          });
          return HR.appView.setContentView(challenge_view);
        });
        if (contest_slug === null) {
          contest_slug = "master";
        }
        HR.appController.set_contest_namespace(contest_slug);
        return window.mixpanel_data = {
          landing: false,
          contest: contest_slug,
          page_type: 'challengepage',
          challenge: challenge_slug
        };
      };

      DashboardRouter.prototype.editorial = function(contest_slug, challenge_slug) {
        var challenge, editorial, fragment, fragments, hacker, options, options_challenge, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("challenges");
        if (fragments[0] === "") {
          challenge_slug = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        HR.util.setTab('editorial');
        options = {
          challenge_slug: challenge_slug
        };
        options_challenge = {
          slug: challenge_slug,
          contest_slug: contest_slug
        };
        editorial = HR.model('editorial', options).cached();
        challenge = HR.model('challenge', options_challenge).cached();
        hacker = HR.profile();
        HR.requires(['compound/extra-views'], function() {
          var singlepost_view;
          return singlepost_view = new HR.EditorialView({
            model: editorial,
            current_hacker: hacker,
            activeTab: 'editorial'
          }, HR.requires(['compound/challenge-views'], function() {
            var challenge_view;
            challenge_view = new HR.ChallengeView({
              model: challenge,
              activeTab: 'editorial',
              customView: singlepost_view
            });
            return HR.appView.setContentView(challenge_view);
          }));
        });
        if (contest_slug === null) {
          contest_slug = "master";
        }
        HR.appController.set_contest_namespace(contest_slug);
        window.mixpanel_data.landing = false;
        window.mixpanel_data.contest = contest_slug;
        return window.mixpanel_data.challenge = challenge_slug;
      };

      DashboardRouter.prototype.questions = function(contest_slug, challenge_slug, question_id) {
        var challenge, fragment, fragments, options, page, question_model, that, _page;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (question_id == null) {
          question_id = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("challenges");
        if (fragments[0] === "") {
          question_id = challenge_slug;
          challenge_slug = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        fragments = fragment.split("questions");
        page = null;
        if (fragments.length > 1 && fragments[1].indexOf("/page") === 0) {
          page = question_id;
          question_id = null;
        }
        HR.util.setTab('challenge');
        options = {
          slug: challenge_slug,
          contest_slug: contest_slug
        };
        challenge = HR.model('challenge', options).cached();
        if (question_id !== null) {
          question_model = new HR.QuestionModel({
            challenge_slug: challenge_slug,
            contest_slug: contest_slug,
            id: question_id
          });
          HR.requires(['compound/forum-views'], function() {
            var question_view;
            question_view = new HR.QuestionView({
              challenge: challenge,
              model: question_model
            });
            return HR.requires(['compound/challenge-views'], function() {
              var challenge_view;
              challenge_view = new HR.ChallengeView({
                model: challenge,
                activeTab: 'forum',
                customView: question_view
              });
              return HR.appView.setContentView(challenge_view);
            });
          });
        } else {
          HR.requires(['compound/challenge-views'], function() {
            var challenge_view;
            challenge_view = new HR.ChallengeView({
              model: challenge,
              activeTab: 'forum',
              paramPage: page
            });
            return HR.appView.setContentView(challenge_view);
          });
        }
        if (contest_slug === null) {
          contest_slug = "master";
        }
        HR.appController.set_contest_namespace(contest_slug);
        _page = "View Post";
        if (question_id === null) {
          _page = "Forum Home";
        }
        window.mixpanel_data.landing = false;
        window.mixpanel_data.contest = contest_slug;
        return window.mixpanel_data.challenge = challenge_slug;
      };

      DashboardRouter.prototype.calendar = function() {
        return HR.requires(['compound/calendar-views'], function() {
          var calendar_view;
          calendar_view = new HR.CalendarView;
          HR.appView.setContentView(calendar_view);
          return HR.appController.setTitle("Programming Contest Calendar");
        });
      };

      DashboardRouter.prototype.askQuestion = function(contest_slug, challenge_slug, question_id) {
        var challenge, fragment, fragments, options, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (question_id == null) {
          question_id = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("challenges");
        if (fragments[0] === "") {
          question_id = challenge_slug;
          challenge_slug = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        HR.util.setTab('challenge');
        options = {
          slug: challenge_slug,
          contest_slug: contest_slug
        };
        challenge = HR.model('challenge', options).cached();
        HR.requires(['compound/forum-views'], function() {
          var challenge_ask_question_view;
          challenge_ask_question_view = new HR.ChallengeAskQuestionView({
            challenge: challenge,
            question_id: question_id
          });
          return HR.requires(['compound/challenge-views'], function() {
            var challenge_view;
            challenge_view = new HR.ChallengeView({
              model: challenge,
              activeTab: 'forum',
              customView: challenge_ask_question_view
            });
            return HR.appView.setContentView(challenge_view);
          });
        });
        if (contest_slug === null) {
          contest_slug = "master";
        }
        HR.appController.set_contest_namespace(contest_slug);
        window.mixpanel_data.landing = false;
        window.mixpanel_data.contest = contest_slug;
        return window.mixpanel_data.challenge = challenge_slug;
      };

      DashboardRouter.prototype.leaderboard = function(extra_options) {
        var defaults, leaderboard, leaderboard_view, options, _contest;
        defaults = {
          page: 1,
          filterString: null,
          base_slug: null
        };
        options = _.extend(defaults, extra_options);
        options.page || (options.page = 1);
        leaderboard = HR.collection('leaderboard');
        leaderboard.setPage(options.page);
        leaderboard.setContestSlug(options.contest_slug);
        if (options.challenge_slug) {
          leaderboard.setChallenge(options.challenge_slug);
          leaderboard.setChallengeLeaderboard();
          if (options.language) {
            leaderboard.setLanguage(options.language);
            leaderboard.setLanguageLeaderboard();
          }
        }
        if (options.track_slug) {
          leaderboard.setTrack(options.track_slug);
          leaderboard.setTrackLeaderboard();
        }
        if (options.filterString) {
          leaderboard.setFiltersFromString(options.filterString);
        }
        leaderboard.cached();
        _contest = HR.model('contest');
        _contest.set('slug', extra_options.contest_slug);
        _contest.cached();
        leaderboard_view = new HR.LeaderboardView({
          collection: leaderboard,
          profile: HR.profile(),
          contest: _contest
        });
        HR.util.setTab('leaderboard');
        HR.appController.setTitle("Leaderboard");
        HR.appView.setContentView(leaderboard_view);
        if (options.contest_slug === null) {
          options.contest_slug = "master";
        }
        HR.appController.set_contest_namespace(options.contest_slug);
        window.mixpanel_data.landing = false;
        return window.mixpanel_data.contest = options.contest_slug;
      };

      DashboardRouter.prototype.parseLeaderboardArgs = function(args, expected) {
        var page;
        args = _.toArray(args);
        if (args.length === expected - 1) {
          page = parseInt(_.last(args), 10);
          if (_.isFinite(page) && page.toString() === _.last(args)) {
            args.unshift(null);
          } else {
            args.push(null);
          }
        } else if (args.length === expected - 2) {
          args.unshift(null);
          args.push(null);
        }
        return args;
      };

      DashboardRouter.prototype.overallLeaderboard = function(level, page) {
        if (level == null) {
          level = 1;
        }
        if (page == null) {
          page = 1;
        }
        return HR.requires(['compound/extra-views'], function() {
          var collection, view;
          collection = HR.collection('leaderboard');
          collection.setPage(page);
          collection.setContestSlug('master');
          collection.setLevel(level);
          collection.cached();
          view = new HR.OverallLeaderboardView({
            collection: collection,
            level: level
          });
          HR.util.setTab('leaderboard');
          HR.appController.setTitle("Leaderboard");
          return HR.appView.setContentView(view);
        });
      };

      DashboardRouter.prototype.trackLeaderboard = function(track, type, level, page, filterString) {
        if (track == null) {
          track = 'algorithms';
        }
        if (type == null) {
          type = 'contest';
        }
        if (level == null) {
          level = 1;
        }
        if (page == null) {
          page = 1;
        }
        if (filterString == null) {
          filterString = '';
        }
        return HR.requires(['compound/extra-views'], function() {
          var collection, view;
          collection = HR.collection('track-leaderboard');
          collection.setPage(page);
          collection.setLevel(level);
          collection.setTrack(track);
          collection.setType(type);
          if (filterString.length > 0) {
            collection.setFiltersFromString(filterString);
          }
          collection.cached();
          view = new HR.LeaderboardMainView({
            collection: collection
          });
          HR.util.setTab('leaderboard');
          HR.appController.setTitle("Leaderboard");
          return HR.appView.setContentView(view);
        });
      };

      DashboardRouter.prototype.filteredTrackLeaderboard = function(track, type, level, filterString, page) {
        if (track == null) {
          track = 'algorithms';
        }
        if (type == null) {
          type = 'contest';
        }
        if (level == null) {
          level = 1;
        }
        if (filterString == null) {
          filterString = '';
        }
        if (page == null) {
          page = 1;
        }
        return this.trackLeaderboard(track, type, level, page, filterString);
      };

      DashboardRouter.prototype.overallLeaderboardRedirect = function(page) {
        if (page == null) {
          page = 1;
        }
        return HR.router.navigate("/leaderboard/level/1/page/" + page, true);
      };

      DashboardRouter.prototype.defaultLeaderboard = function(contest_slug, page) {
        var args;
        if (contest_slug == null) {
          contest_slug = "master";
        }
        if (page == null) {
          page = null;
        }
        args = this.parseLeaderboardArgs(arguments, 2);
        return this.leaderboard({
          contest_slug: args[0],
          page: args[1]
        });
      };

      DashboardRouter.prototype.archivedLeaderboard = function(page, filterString) {
        var leaderboard, leaderboard_view, _contest;
        if (page == null) {
          page = 1;
        }
        if (filterString == null) {
          filterString = "";
        }
        leaderboard = HR.collection('leaderboard');
        leaderboard.setPage(page);
        leaderboard.setContestSlug("master");
        leaderboard.setArchived(true);
        if (filterString) {
          leaderboard.setFiltersFromString(filterString);
        }
        leaderboard.cached();
        _contest = HR.model('contest');
        _contest.setSlug('master');
        _contest.cached();
        leaderboard_view = new HR.LeaderboardView({
          collection: leaderboard,
          profile: HR.profile(),
          contest: _contest,
          archived: true
        });
        HR.util.setTab('leaderboard');
        HR.appController.setTitle("Leaderboard");
        HR.appView.setContentView(leaderboard_view);
        return HR.appController.set_contest_namespace("master");
      };

      DashboardRouter.prototype.archivedFilterLeaderboard = function(filterString, page) {
        if (page == null) {
          page = 1;
        }
        return this.archivedLeaderboard(page, filterString);
      };

      DashboardRouter.prototype.filterLeaderboard = function(contest_slug, filterString, page) {
        var args;
        if (contest_slug == null) {
          contest_slug = "master";
        }
        if (filterString == null) {
          filterString = null;
        }
        if (page == null) {
          page = null;
        }
        args = this.parseLeaderboardArgs(arguments, 3);
        return this.leaderboard({
          contest_slug: args[0],
          filterString: args[1],
          page: args[2]
        });
      };

      DashboardRouter.prototype.challengeLeaderboard = function(contest_slug, challenge_slug, page, filterString) {
        var model, options;
        if (contest_slug == null) {
          contest_slug = "master";
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (page == null) {
          page = null;
        }
        if (filterString == null) {
          filterString = null;
        }
        options = {
          slug: challenge_slug,
          contest_slug: contest_slug
        };
        model = HR.model('challenge', options).cached();
        return HR.requires(['compound/challenge-views'], function() {
          var challenge_view;
          challenge_view = new HR.ChallengeView({
            model: model,
            activeTab: 'leaderboard',
            paramPage: page,
            leaderboardFilter: filterString
          });
          return HR.appView.setContentView(challenge_view);
        });
      };

      DashboardRouter.prototype.masterChallengeLeaderboard = function(challenge_slug, page, filterString) {
        var model, options;
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (page == null) {
          page = null;
        }
        if (filterString == null) {
          filterString = null;
        }
        options = {
          slug: challenge_slug,
          contest_slug: 'master'
        };
        model = HR.model('challenge', options).cached();
        return HR.requires(['compound/challenge-views'], function() {
          var challenge_view;
          challenge_view = new HR.ChallengeView({
            model: model,
            activeTab: 'leaderboard',
            paramPage: page,
            leaderboardFilter: filterString
          });
          return HR.appView.setContentView(challenge_view);
        });
      };

      DashboardRouter.prototype.filterChallengeLeaderboard = function(contest_slug, challenge_slug, filterString, page) {
        var args;
        if (contest_slug == null) {
          contest_slug = "master";
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (filterString == null) {
          filterString = null;
        }
        if (page == null) {
          page = null;
        }
        args = this.parseLeaderboardArgs(arguments, 4);
        contest_slug = args[0];
        challenge_slug = args[1] || contest_slug;
        page = _.last(args) || 1;
        filterString = args[2];
        return this.challengeLeaderboard(contest_slug, challenge_slug, page, filterString);
      };

      DashboardRouter.prototype.masterFilterChallengeLeaderboard = function(challenge_slug, filterString, page) {
        var contest_slug;
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (filterString == null) {
          filterString = null;
        }
        if (page == null) {
          page = null;
        }
        contest_slug = 'master';
        challenge_slug = challenge_slug;
        page = page;
        filterString = filterString;
        return this.masterChallengeLeaderboard(challenge_slug, page, filterString);
      };

      DashboardRouter.prototype.languageLeaderboard = function(contest_slug, challenge_slug, language, page) {
        var args;
        if (contest_slug == null) {
          contest_slug = "master";
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (language == null) {
          language = null;
        }
        if (page == null) {
          page = null;
        }
        args = this.parseLeaderboardArgs(arguments, 4);
        return this.leaderboard({
          contest_slug: args[0],
          challenge_slug: args[1],
          language: args[2],
          page: _.last(args)
        });
      };

      DashboardRouter.prototype.filterLanguageLeaderboard = function(contest_slug, challenge_slug, language, filterString, page) {
        var args;
        if (contest_slug == null) {
          contest_slug = "master";
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (language == null) {
          language = null;
        }
        if (filterString == null) {
          filterString = null;
        }
        if (page == null) {
          page = null;
        }
        args = this.parseLeaderboardArgs(arguments, 5);
        return this.leaderboard({
          contest_slug: args[0],
          challenge_slug: args[1],
          language: args[2],
          filterString: args[3],
          page: _.last(args)
        });
      };

      DashboardRouter.prototype.nvnLeaderboard = function(contest_slug, page, kind, internal) {
        var fragment, fragments, leaderboard, leaderboard_view, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (page == null) {
          page = null;
        }
        if (kind == null) {
          kind = null;
        }
        if (internal == null) {
          internal = false;
        }
        if (!internal) {
          fragment = Backbone.history.fragment;
          fragments = fragment.split("leaderboard/nvn");
          if (fragments[0] === "") {
            kind = page;
            page = contest_slug;
            contest_slug = null;
          } else {
            that = this;
            HR.appController.querySlug({
              slug: contest_slug,
              callback: function(resp) {
                if (resp.type !== "contest") {
                  return that.e404();
                }
              }
            });
          }
        }
        if (page === null || page === "") {
          page = 1;
        }
        HR.appController.setTitle("Network vs Network Leaderboard");
        HR.util.setTab('leaderboard');
        leaderboard = new HR.NvNLeaderboardCollection;
        leaderboard.setPage(page);
        if (kind) {
          leaderboard.setKind(kind);
        }
        leaderboard_view = new HR.NvNLeaderboardView({
          collection: leaderboard
        });
        HR.appView.setContentView(leaderboard_view);
        if (contest_slug === null) {
          contest_slug = "master";
        }
        window.mixpanel_data.landing = false;
        return window.mixpanel_data.contest = contest_slug;
      };

      DashboardRouter.prototype.nvnKindLeaderboard = function(contest_slug, kind, page) {
        var fragment, fragments, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (kind == null) {
          kind = null;
        }
        if (page == null) {
          page = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("leaderboard/nvn/kind");
        if (fragments[0] === "") {
          page = kind;
          kind = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        if (page === null || page === "") {
          page = 1;
        }
        HR.appController.setTitle("Network vs Network Leaderboard");
        return this.nvnLeaderboard(contest_slug, page, kind, true);
      };

      DashboardRouter.prototype.judge_submissions = function(contest_slug, challenge_slug, team_slug, page) {
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (team_slug == null) {
          team_slug = null;
        }
        if (page == null) {
          page = null;
        }
        HR.appController.set_contest_namespace(contest_slug);
        if (page === null || page === "" || _.isNaN(parseInt(page))) {
          page = 1;
        }
        HR.appController.setTitle("Submissions");
        if (challenge_slug !== null) {
          HR.appController.setTitle("" + challenge_slug + " Submissions");
        }
        HR.util.setTab('submissions');
        HR.requires(['compound/submission-views'], function() {
          var submissions;
          submissions = HR.collection('judge-submissions');
          submissions.page = page;
          submissions.contest_slug = contest_slug;
          submissions.challenge_slug = challenge_slug;
          submissions.team_slug = team_slug;
          return submissions.fetch({
            success: (function(_this) {
              return function() {
                var submissions_view;
                submissions_view = new HR.JudgeSubmissionsView({
                  collection: submissions,
                  team_slug: team_slug,
                  challenge_slug: challenge_slug
                });
                return HR.appView.setContentView(submissions_view);
              };
            })(this)
          });
        });
        window.mixpanel_data.landing = false;
        window.mixpanel_data.contest = contest_slug;
        window.mixpanel_data.challenge = challenge_slug;
        return window.mixpanel_data.page_type = 'judge_submissions';
      };

      DashboardRouter.prototype.judge_contest_submissions = function(contest_slug, page) {
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (page == null) {
          page = null;
        }
        return this.judge_submissions(contest_slug, null, null, page);
      };

      DashboardRouter.prototype.judge_team_submissions = function(contest_slug, team_slug, page) {
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (page == null) {
          page = null;
        }
        return this.judge_submissions(contest_slug, null, team_slug, page);
      };

      DashboardRouter.prototype.judge_challenge_submissions = function(contest_slug, challenge_slug, page) {
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (page == null) {
          page = null;
        }
        return this.judge_submissions(contest_slug, challenge_slug, null, page);
      };

      DashboardRouter.prototype.submissions = function(contest_slug, kind, page, challenge_slug, internal) {
        var fragment, fragments, module, that, _kind;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (kind == null) {
          kind = null;
        }
        if (page == null) {
          page = null;
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (internal == null) {
          internal = false;
        }
        module = false;
        fragment = Backbone.history.fragment;
        fragments = fragment.split("/");
        if (!internal) {
          if (fragments[0] === "submissions") {
            challenge_slug = page;
            page = kind;
            kind = contest_slug;
            contest_slug = null;
          } else {
            that = this;
            HR.appController.querySlug({
              slug: contest_slug,
              callback: function(resp) {
                if (resp.type === "contest") {
                  return module = false;
                } else if (resp.type === "module") {
                  return module = true;
                } else {
                  return that.e404();
                }
              }
            });
          }
        }
        if (kind === null) {
          _kind = $.cookie('hr_submissions_kind');
          if (!_kind) {
            _kind = "all";
            $.cookie('hr_submissions_kind', _kind);
          }
          fragments.push(_kind);
          HR.router.navigate(fragments.join("/"), {
            trigger: true,
            replace: true
          });
          return;
        }
        $.cookie('hr_submissions_kind', kind);
        if (page === null || page === "" || _.isNaN(parseInt(page))) {
          page = 1;
        }
        if (challenge_slug === null) {
          HR.appController.setTitle("Submissions");
        }
        HR.util.setTab('submissions');
        HR.requires(['compound/submission-views'], function() {
          var submissions, submissions_view;
          if (challenge_slug) {
            submissions = HR.collection('submissions');
            submissions.setPage(page);
            submissions.setContest(contest_slug);
            submissions.setChallenge(challenge_slug);
            submissions.cached();
            submissions_view = new HR.SubmissionsView({
              collection: submissions
            });
          } else if (__indexOf.call(fragments, "grouped") >= 0) {
            submissions = HR.collection('grouped-submissions');
            submissions.setPage(page);
            submissions.setContest(contest_slug);
            submissions.cached();
            submissions_view = new HR.GroupedSubmissionsView({
              collection: submissions
            });
          } else {
            submissions = HR.collection('chronological-submissions');
            submissions.setPage(page);
            submissions.setContest(contest_slug);
            submissions.cached();
            submissions_view = new HR.ChronologicalSubmissionsView({
              collection: submissions
            });
          }
          return HR.appView.setContentView(submissions_view);
        });
        if (contest_slug === null) {
          contest_slug = "master";
        }
        HR.appController.set_contest_namespace(contest_slug);
        window.mixpanel_data.landing = false;
        window.mixpanel_data.contest = contest_slug;
        window.mixpanel_data.challenge = challenge_slug;
        return window.mixpanel_data.page_type = 'submissions';
      };

      DashboardRouter.prototype.challengeSubmissions = function(contest_slug, challenge_slug, page) {
        var fragment, fragments, model, options, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (page == null) {
          page = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("challenges");
        if (fragments[0] === "") {
          page = challenge_slug;
          challenge_slug = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        if (page === null || page === "") {
          page = 1;
        }
        options = {
          slug: challenge_slug,
          contest_slug: contest_slug
        };
        model = HR.model('challenge', options).cached();
        HR.requires(['compound/challenge-views'], function() {
          var challenge_view;
          challenge_view = new HR.ChallengeView({
            model: model,
            activeTab: 'submissions',
            paramPage: page
          });
          return HR.appView.setContentView(challenge_view);
        });
        if (contest_slug === null) {
          contest_slug = "master";
        }
        window.mixpanel_data.landing = false;
        window.mixpanel_data.contest = contest_slug;
        return window.mixpanel_data.challenge = challenge_slug;
      };

      DashboardRouter.prototype.submission = function(contest_slug, kind, submission_id, _filter, element, element_id) {
        var contest, fragment, fragments, game_id, page, submission_model, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (kind == null) {
          kind = null;
        }
        if (submission_id == null) {
          submission_id = null;
        }
        if (_filter == null) {
          _filter = null;
        }
        if (element == null) {
          element = null;
        }
        if (element_id == null) {
          element_id = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("submissions");
        if (fragments[0] === "") {
          element_id = element;
          element = _filter;
          _filter = submission_id;
          submission_id = kind;
          kind = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        if (!element_id && element) {
          element_id = element;
          element = _filter;
          _filter = null;
        }
        if (contest_slug) {
          HR.appController.set_contest_namespace(contest_slug);
        }
        contest = HR.model("contest");
        if (contest_slug) {
          contest.set('slug', contest_slug);
        }
        contest.cached();
        HR.appController.setTitle("Submission Details");
        HR.util.setTab('submissions');
        if (submission_id && kind) {
          if (!element || element === 'page') {
            if (element === 'page') {
              page = element_id;
            } else {
              page = 1;
            }
            if (_filter === null) {
              _filter = "all";
            }
            submission_model = HR.model('submission', {
              id: submission_id,
              filter: _filter,
              contest_slug: contest_slug
            }).cached();
            HR.requires(['compound/submission-views'], function() {
              var gameset_collection;
              if (!this.submission_view) {
                this.submission_view = new HR.SubmissionView({
                  contest: contest
                });
              }
              this.submission_view.setSubmissionModel(submission_model);
              if (kind === 'game') {
                gameset_collection = HR.collection('game-set');
                gameset_collection.setPage(page);
                gameset_collection.setFilter(_filter);
                gameset_collection.setSid(submission_id);
                gameset_collection.cached();
                this.submission_view.setGameSetCollection(gameset_collection);
              }
              if (this.submission_view.gameset) {
                this.submission_view.gameset.resetGameSetView();
              }
              return HR.appView.setContentView(this.submission_view);
            });
          } else if (element === 'play') {
            game_id = element_id;
            if ((HR.game && HR.game.get('id') !== game_id) || (!HR.game)) {
              HR.game = new HR.GameModel({
                id: game_id
              });
              HR.game.fetch();
              HR.requires(['compound/game-views'], function() {
                return HR.game_view = new HR.GameView({
                  model: HR.game
                });
              });
            }
            HR.appView.setContentView(HR.game_view);
            HR.game_view.render();
          }
        }
        if (contest_slug === null) {
          contest_slug = "master";
        }
        window.mixpanel_data.landing = false;
        window.mixpanel_data.contest = contest_slug;
        return window.mixpanel_data.challenge = submission_model.slug;
      };

      DashboardRouter.prototype.gameDetails = function(id) {
        var model;
        if (id === null) {
          return;
        }
        model = HR.model('game', {
          id: id
        }).cached();
        return HR.requires(['compound/gamedetail-view'], function() {
          var gameDetail_view;
          gameDetail_view = new HR.GameDetailView({
            id: id,
            model: model
          });
          HR.appView.setContentView(gameDetail_view);
          return HR.appController.setTitle("Game details");
        });
      };

      DashboardRouter.prototype.administration_redirect = function() {
        return this.navigate("/administration/contests", {
          trigger: true,
          replace: true
        });
      };

      DashboardRouter.prototype.administration_resource_list = function(resource, query, page) {
        var fragment;
        if (resource == null) {
          resource = "contests";
        }
        if (query == null) {
          query = null;
        }
        if (page == null) {
          page = 1;
        }
        fragment = Backbone.history.fragment;
        if (fragment.split("query").length === 1 && fragment.split("page").length > 1) {
          page = query;
          query = null;
        }
        if (resource !== "contests" && resource !== "challenges" && resource !== "companies") {
          this.e404();
          return;
        }
        if (this.loggedIn()) {
          return HR.requires(['compound/administration-views'], function() {
            var collection, _clbk, _view;
            _clbk = function(collection) {
              if (query) {
                collection.setQuery(query);
              }
              return collection.page = page;
            };
            collection = HR.appController.getCollection("administration-" + resource, "page-" + page, _clbk);
            _view = new HR.Administration_ResourceListView({
              collection: collection,
              page: page,
              resource: resource,
              query: query
            });
            HR.appView.setContentView(_view);
            HR.appController.setTitle("Manage " + (_.capitalize(resource)));
            return HR.appController.set_contest_namespace('master');
          });
        }
      };

      DashboardRouter.prototype.administration_contest_edit_challenges = function(contest_id, page) {
        if (contest_id == null) {
          contest_id = null;
        }
        if (page == null) {
          page = 1;
        }
        return this.administration_contest_edit('edit', contest_id, 'challenges', page);
      };

      DashboardRouter.prototype.administration_contest_edit = function(action, contest_id, tab, page) {
        if (action == null) {
          action = null;
        }
        if (contest_id == null) {
          contest_id = null;
        }
        if (tab == null) {
          tab = null;
        }
        if (page == null) {
          page = 1;
        }
        if ((action === 'create' && contest_id === null && tab === null) || (action === 'edit' && contest_id !== null && tab !== null)) {
          if (this.loggedIn()) {
            return HR.requires(['compound/administration-views'], function() {
              var model, _clbk, _view;
              _clbk = function(model) {
                return model.set('id', contest_id);
              };
              model = HR.appController.getModel('administration-contest', "id-" + contest_id, _clbk);
              _view = new HR.Administration_ContestEditView({
                model: model,
                tab: tab,
                action: action,
                contest_id: contest_id,
                page: page
              });
              HR.appView.setContentView(_view);
              return HR.appController.setTitle("Contest " + (_.capitalize(action)));
            });
          }
        } else if (action === 'edit' && contest_id !== null && tab === null) {
          return this.navigate("/administration/contests/" + action + "/" + contest_id + "/overview", {
            trigger: true,
            replace: true
          });
        } else {
          return this.e404();
        }
      };

      DashboardRouter.prototype.administration_challenge_edit = function(action, challenge_id, tab) {
        if (action == null) {
          action = null;
        }
        if (challenge_id == null) {
          challenge_id = null;
        }
        if (tab == null) {
          tab = null;
        }
        return this.administration_contest_challenge_edit(null, action, challenge_id, tab);
      };

      DashboardRouter.prototype.administration_contest_challenge_edit = function(contest_id, action, challenge_id, tab) {
        if (contest_id == null) {
          contest_id = null;
        }
        if (action == null) {
          action = null;
        }
        if (challenge_id == null) {
          challenge_id = null;
        }
        if (tab == null) {
          tab = null;
        }
        if ((action === 'create' && challenge_id === null && tab === null) || (action === 'edit' && challenge_id !== null && tab !== null)) {
          if (this.loggedIn()) {
            return HR.requires(['compound/administration-views'], function() {
              var model, _clbk, _view;
              _clbk = function(model) {
                if (contest_id) {
                  model.set('contest_id', contest_id);
                }
                return model.set('challenge_id', challenge_id);
              };
              model = HR.appController.getModel('administration-challenge', "id-" + challenge_id, _clbk);
              _view = new HR.Administration_ChallengeEditView({
                model: model,
                tab: tab,
                action: action,
                contest_id: contest_id,
                challenge_id: challenge_id
              });
              HR.appView.setContentView(_view);
              return HR.appController.setTitle("Challenge " + (_.capitalize(action)));
            });
          }
        } else if (action === 'edit' && challenge_id !== null && tab === null) {
          if (contest_id) {
            return this.navigate("/administration/contests/edit/" + contest_id + "/challenges/edit/" + challenge_id + "/overview", {
              trigger: true,
              replace: true
            });
          } else {
            return this.navigate("/administration/challenges/edit/" + challenge_id + "/overview", {
              trigger: true,
              replace: true
            });
          }
        } else {
          return this.e404();
        }
      };

      DashboardRouter.prototype.administration_company_edit = function(action, company_id, tab, tab_id, page, hacker_id) {
        if (action == null) {
          action = null;
        }
        if (company_id == null) {
          company_id = null;
        }
        if (tab == null) {
          tab = null;
        }
        if (tab_id == null) {
          tab_id = null;
        }
        if (page == null) {
          page = 1;
        }
        if (hacker_id == null) {
          hacker_id = null;
        }
        if ((action === 'create' && company_id === null && tab === null) || (action === 'edit' && company_id !== null && tab !== null)) {
          if (this.loggedIn()) {
            return HR.requires(['compound/administration-views'], function() {
              var model, _clbk, _view;
              _clbk = function(model) {
                return model.set('company_id', company_id);
              };
              model = HR.appController.getModel('administration-company', "id-" + company_id, _clbk);
              _view = new HR.Administration_CompanyEditView({
                model: model,
                tab: tab,
                action: action,
                company_id: company_id,
                tab_id: tab_id,
                page: page,
                hacker_id: hacker_id
              });
              HR.appView.setContentView(_view);
              return HR.appController.setTitle("Challenge " + (_.capitalize(action)));
            });
          }
        } else if (action === 'edit' && company_id !== null && tab === null) {
          return this.navigate("/administration/companies/edit/" + company_id + "/overview", {
            trigger: true,
            replace: true
          });
        } else {
          return this.e404();
        }
      };

      DashboardRouter.prototype.manage_home = function() {
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        return HR.requires(['compound/extra-views'], function() {
          var _view;
          _view = new HR.Manage_HomeView;
          HR.appView.setContentView(_view);
          return HR.appController.setTitle("Management");
        });
      };

      DashboardRouter.prototype.manage_challenge_filtered = function(filter, page) {
        var collection;
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        HR.appController.setTitle("Challenge List");
        collection = HR.collection("manage-challenge-list");
        collection.query = filter;
        collection.setPage(page);
        return collection.fetch({
          success: (function(_this) {
            return function() {
              return HR.requires(['compound/extra-views'], function() {
                var challenge_list_view;
                challenge_list_view = new HR.Manage_ChallengeListView({
                  collection: collection
                });
                return HR.appView.setContentView(challenge_list_view);
              });
            };
          })(this)
        });
      };

      DashboardRouter.prototype.manage_challenge = function(page, filter) {
        var collection;
        if (page == null) {
          page = 1;
        }
        if (filter == null) {
          filter = "";
        }
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        HR.appController.setTitle("Challenge List");
        collection = HR.collection("manage-challenge-list");
        collection.setPage(page);
        return collection.fetch({
          success: (function(_this) {
            return function() {
              return HR.requires(['compound/extra-views'], function() {
                var challenge_list_view;
                challenge_list_view = new HR.Manage_ChallengeListView({
                  collection: collection
                });
                return HR.appView.setContentView(challenge_list_view);
              });
            };
          })(this)
        });
      };

      DashboardRouter.prototype.edit_challenge = function(id, current_tab) {
        var key, model;
        if (id == null) {
          id = null;
        }
        if (current_tab == null) {
          current_tab = "basic";
        }
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        HR.appController.setTitle("Challenge Editor");
        key = "id-" + id;
        if (id === "new") {
          key = "id-" + id + "-" + (Math.round(Math.random() * 10000 + 10000));
        }
        model = HR.model("manage_-challenge");
        if (id !== "new") {
          model.setId(id);
          return model.fetch({
            success: function(mdl) {
              return HR.requires(['compound/extra-views'], function() {
                var challenge_edit_view;
                challenge_edit_view = new HR.Manage_ChallengeEditView({
                  model: mdl,
                  current_tab: current_tab
                });
                return HR.appView.setContentView(challenge_edit_view);
              });
            }
          });
        } else {
          return HR.requires(['compound/extra-views'], function() {
            var challenge_edit_view;
            challenge_edit_view = new HR.Manage_ChallengeEditView({
              model: model
            });
            return HR.appView.setContentView(challenge_edit_view);
          });
        }
      };

      DashboardRouter.prototype.edit_template = function(id) {
        var _templatemodel;
        if (id == null) {
          id = null;
        }
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        HR.appController.setTitle("Template Editor");
        _templatemodel = HR.appController.getModel("managetemplate", "id-" + id, null, false);
        if (id !== "new") {
          _templatemodel.setId(id);
        }
        return HR.requires(['compound/extra-views'], function() {
          var template_edit_view;
          template_edit_view = new HR.Manage_TemplateEditView({
            model: _templatemodel
          });
          return HR.appView.setContentView(template_edit_view);
        });
      };

      DashboardRouter.prototype.manage_contest = function(page) {
        var collection;
        if (page == null) {
          page = 1;
        }
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        HR.appController.setTitle("HackerRank Contests");
        collection = HR.collection('manage-contest-list');
        collection.setPage(page);
        return collection.fetch({
          success: (function(_this) {
            return function() {
              return HR.requires(['compound/extra-views'], function() {
                var contest_list_view;
                contest_list_view = new HR.Manage_ContestListView({
                  collection: collection
                });
                return HR.appView.setContentView(contest_list_view);
              });
            };
          })(this)
        });
      };

      DashboardRouter.prototype.new_contest = function() {
        HR.requires(['compound/extra-views'], (function(_this) {
          return function() {
            var new_contest, new_contest_view;
            new_contest = new HR.Manage_ContestModel();
            new_contest_view = new HR.Manage_NewContestView({
              model: new_contest
            });
            return HR.appView.setContentView(new_contest_view);
          };
        })(this));
        return this;
      };

      DashboardRouter.prototype.edit_contest = function(id, current_tab) {
        var _contest;
        if (current_tab == null) {
          current_tab = "basic";
        }
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        HR.appController.setTitle("Contest Editor");
        _contest = (new HR.Manage_ContestModel()).setId(id);
        return HR.requires(['compound/extra-views', 'moment'], function() {
          var contest_edit_view;
          contest_edit_view = new HR.Manage_ContestEditView({
            model: _contest,
            current_tab: current_tab
          });
          return HR.appView.setContentView(contest_edit_view);
        });
      };

      DashboardRouter.prototype.hacker_application_upload_profile = function(contest_slug, challenge_slug, company_slug) {
        var collection, fragment;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (company_slug == null) {
          company_slug = null;
        }
        fragment = Backbone.history.fragment;
        if (fragment.split("contests")[0] === "") {
          "";
        } else if (fragment.split("challenges")[0] === "") {
          company_slug = challenge_slug;
          challenge_slug = contest_slug;
          contest_slug = null;
        } else if (fragment.split("apply")[0] === "") {
          company_slug = contest_slug;
          challenge_slug = null;
          contest_slug = null;
        }
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        if (contest_slug === null) {
          contest_slug = "master";
        }
        HR.appController.setTitle("Apply to Company");
        collection = new HR.CompaniesCollection();
        collection.contest_slug = contest_slug;
        collection.challenge_slug = challenge_slug;
        return collection.fetch({
          success: (function(_this) {
            return function(collection) {
              var _hacker;
              _hacker = HR.profile();
              return HR.requires(['compound/extra-views'], function() {
                var _view;
                _view = new HR.HackerApplicationProfileUpdateView({
                  companies: collection,
                  hacker: _hacker
                });
                return HR.appView.setContentView(_view);
              });
            };
          })(this)
        });
      };

      DashboardRouter.prototype.hacker_application = function(contest_slug, challenge_slug, company_slug) {
        var collection, fragment;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (challenge_slug == null) {
          challenge_slug = null;
        }
        if (company_slug == null) {
          company_slug = null;
        }
        fragment = Backbone.history.fragment;
        if (fragment.split("contests")[0] === "") {
          "";
        } else if (fragment.split("challenges")[0] === "") {
          company_slug = challenge_slug;
          challenge_slug = contest_slug;
          contest_slug = null;
        } else if (fragment.split("apply")[0] === "") {
          company_slug = contest_slug;
          challenge_slug = null;
          contest_slug = null;
        }
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        if (contest_slug === null) {
          contest_slug = "master";
        }
        HR.appController.setTitle("Apply to Company");
        collection = new HR.CompaniesCollection();
        collection.contest_slug = contest_slug;
        collection.challenge_slug = challenge_slug;
        return collection.fetch({
          success: (function(_this) {
            return function(collection) {
              var _hacker;
              _hacker = HR.profile();
              return HR.requires(['compound/extra-views'], function() {
                var _view;
                _view = new HR.ParticipantApplicationView({
                  companies: collection,
                  hacker: _hacker
                });
                return HR.appView.setContentView(_view);
              });
            };
          })(this)
        });
      };

      DashboardRouter.prototype.manage_notification = function(contest_slug) {
        var contest, notification;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        contest = new HR.ContestModel({
          slug: contest_slug
        });
        contest.fetch({
          async: false
        });
        notification = new HR.Manage_NotificationModel({
          contest_id: contest.get('id')
        });
        return HR.requires(['compound/extra-views'], function() {
          var notificationview;
          notificationview = new HR.Manage_NotificationView({
            model: notification,
            contest: contest
          });
          return HR.appView.setContentView(notificationview);
        });
      };

      DashboardRouter.prototype.manage_applications = function(contest_slug, company_slug, filter, page) {
        var contest, fragment, _collection;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (company_slug == null) {
          company_slug = null;
        }
        if (filter == null) {
          filter = null;
        }
        if (page == null) {
          page = null;
        }
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        fragment = Backbone.history.fragment;
        contest = new HR.ContestModel();
        contest.set('slug', contest_slug);
        contest.cached();
        if (fragment.split("manage/applications")[0] === "") {
          page = filter;
          filter = company_slug;
          company_slug = contest_slug;
          contest_slug = "master";
        }
        if (page === null || page === "") {
          page = 1;
        }
        _collection = HR.appController.getCollection("hackerapplications", "page-" + page, function(collection) {
          collection.setContestId(contest_slug);
          collection.setCompanyId(company_slug);
          collection.setPage(page);
          return collection.setFilterString(filter);
        }, true, true, true);
        return HR.requires(['compound/extra-views'], function() {
          var _view;
          _view = new HR.Manage_HackerApplicationsView({
            collection: _collection,
            contest: contest
          });
          return HR.appView.setContentView(_view);
        });
      };

      DashboardRouter.prototype.admin_submissions = function(contest_slug, filter, page) {
        var fragment, _collection;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (filter == null) {
          filter = null;
        }
        if (page == null) {
          page = null;
        }
        if (!this.loggedIn()) {
          this.e404();
          return;
        }
        fragment = Backbone.history.fragment;
        if (page === null) {
          page = 1;
        }
        if (filter === null) {
          filter = "";
        }
        if (contest_slug === null) {
          contest_slug = "master";
        }
        return _collection = HR.appController.getCollection("submission_hackers", "" + contest_slug + "-" + filter + "-page-" + page, (function(_this) {
          return function(collection) {
            collection.setFilterString(filter);
            collection.setContest(contest_slug);
            collection.setPage(page);
            return collection.fetch({
              success: function(collection, response, options) {
                return HR.requires(['compound/extra-views'], function() {
                  var _view;
                  _view = new HR.Manage_HackerSubmissionsView({
                    collection: collection
                  });
                  return HR.appView.setContentView(_view);
                });
              }
            });
          };
        })(this), false, false);
      };

      DashboardRouter.prototype.company_applications = function(contest_slug, key, filter, page) {
        var contest, fragment;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (key == null) {
          key = null;
        }
        if (filter == null) {
          filter = null;
        }
        if (page == null) {
          page = null;
        }
        fragment = Backbone.history.fragment;
        if (fragment.split("applications")[0] === "") {
          page = filter;
          filter = key;
          key = contest_slug;
          contest_slug = "master";
        }
        if (page === null || page === "") {
          page = 1;
        }
        contest = new HR.ContestModel();
        contest.set('slug', contest_slug);
        contest.cached();
        return $.ajax({
          url: "/rest/contests/" + contest_slug + "/companies/verify?key=" + key,
          method: "GET",
          success: (function(_this) {
            return function(resp, xhr) {
              var company_slug, _collection;
              company_slug = resp.company;
              _collection = HR.appController.getCollection("hackerapplications", "page-" + page, function(collection) {
                collection.setContestId(contest_slug);
                collection.setCompanyId(company_slug);
                collection.setPage(page);
                collection.setKey(key);
                return collection.setFilterString(filter);
              }, false, false);
              _this.log(_collection);
              return _collection.fetch({
                disableThrobber: true,
                success: function() {
                  return HR.requires(['compound/extra-views'], function() {
                    var _view;
                    _view = new HR.Manage_HackerApplicationsView({
                      collection: _collection,
                      contest: contest
                    });
                    return HR.appView.setContentView(_view);
                  });
                }
              });
            };
          })(this),
          error: (function(_this) {
            return function(resp) {
              return _this.e404();
            };
          })(this)
        });
      };

      DashboardRouter.prototype.e404 = function() {
        HR.appController.setTitle("HTTP 404: Page Not Found");
        HR.appView.setContentView(HR.E404View);
        return _gaq.push(['_trackPageview', "/404?page=" + Backbone.history.fragment]);
      };

      DashboardRouter.prototype.eLogin = function() {
        HR.util.ShowLoginDialog({
          success_callback: function() {
            return window.location.reload();
          }
        }).render();
        return this.e404();
      };

      DashboardRouter.prototype.loggedIn = function() {
        var profile;
        profile = HR.profile();
        if (profile.isLoggedIn()) {
          return true;
        } else {
          HR.appController.setTitle("HTTP 401: Authorization Required");
          HR.appView.setContentView(HR.ELoginView);
          _gaq.push(['_trackPageview', "/loginError?page=" + Backbone.history.fragment]);
          return false;
        }
      };

      DashboardRouter.prototype.settings = function(contest_slug, tab) {
        var fragment, fragments, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (tab == null) {
          tab = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("settings");
        if (fragments[0] === "") {
          tab = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        HR.appController.setTitle("Settings");
        HR.util.setTab('profile');
        if (tab === null) {
          tab = 'profile';
          HR.router.navigate("settings/" + tab, {
            trigger: true,
            replace: true
          });
        }
        HR.model('profile').cached({
          fetch: true,
          disableThrobber: true
        });
        HR.requires(['compound/profile-views'], function() {
          var settings_view;
          settings_view = new HR.SettingsView({
            model: HR.profile(),
            tab: tab
          });
          return HR.appView.setContentView(settings_view);
        });
        if (contest_slug === null) {
          contest_slug = "master";
        }
        HR.appController.set_contest_namespace(contest_slug);
        return window.mixpanel_data.landing = false;
      };

      DashboardRouter.prototype.scoring = function(contest_slug, section) {
        var fragment, fragments, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (section == null) {
          section = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("scoring");
        if (fragments[0] === "") {
          section = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        HR.requires(['compound/extra-views'], function() {
          var scoring_view;
          HR.appController.setTitle("Scoring");
          scoring_view = new HR.ScoringView({
            section: section,
            model: HR.model('contest').cached()
          });
          return HR.appView.setContentView(scoring_view);
        });
        return window.mixpanel_data.landing = false;
      };

      DashboardRouter.prototype.apihome = function() {
        return HR.requires(['compound/extra-views'], function() {
          var api_home_view;
          HR.appController.setTitle("API");
          api_home_view = new HR.APIHomeView();
          return HR.appView.setContentView(api_home_view);
        });
      };

      DashboardRouter.prototype.api = function() {
        return HR.requires(['compound/extra-views'], function() {
          var api_view;
          HR.appController.setTitle("API");
          api_view = new HR.APIView();
          return HR.appView.setContentView(api_view);
        });
      };

      DashboardRouter.prototype.faq = function(contest_slug, tab) {
        var fragment, fragments, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (tab == null) {
          tab = "";
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("faq");
        if (fragments[0] === "") {
          tab = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        return HR.requires(['compound/extra-views'], function() {
          var faq_view;
          HR.appController.setTitle("FAQ");
          faq_view = new HR.FaqView({
            tab: tab
          });
          return HR.appView.setContentView(faq_view);
        });
      };

      DashboardRouter.prototype.problemsetter = function(contest_slug, section) {
        var fragment, fragments, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (section == null) {
          section = null;
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("problemsetter");
        if (fragments[0] === "") {
          section = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        HR.requires(['compound/extra-views'], function() {
          var problem_setter_view;
          problem_setter_view = new HR.ProblemSetterView({
            section: section
          });
          return HR.appView.setContentView(problem_setter_view);
        });
        return window.mixpanel_data.landing = false;
      };

      DashboardRouter.prototype.environment = function(contest_slug, tab) {
        var fragment, fragments, that;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (tab == null) {
          tab = "";
        }
        fragment = Backbone.history.fragment;
        fragments = fragment.split("environment");
        if (fragments[0] === "") {
          tab = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        HR.requires(['compound/extra-views'], function() {
          var environment_view;
          HR.appController.setTitle("Environment");
          environment_view = new HR.EnvironmentView({
            tab: tab
          });
          return HR.appView.setContentView(environment_view);
        });
        return window.mixpanel_data.landing = false;
      };

      DashboardRouter.prototype.contests = function(contest_slug, page) {
        var collection, contest, contests_view;
        if (contest_slug == null) {
          contest_slug = null;
        }
        if (page == null) {
          page = 1;
        }
        collection = new HR.ContestsCollection({
          key: 'active',
          contest_slug: contest_slug,
          page: page
        });
        contest = null;
        if (contest_slug && contest_slug !== "archived") {
          contest = new HR.ContestModel({
            slug: contest_slug
          }).cached();
        }
        contests_view = new HR.ContestsView({
          collection: collection.cached(),
          contest: contest,
          profile: HR.profile(),
          contest_slug: contest_slug,
          page: page
        });
        HR.appView.setContentView(contests_view);
        HR.util.setTab('contests');
        HR.appController.setTitle("Contests");
        if (contest_slug === null) {
          HR.appController.set_contest_namespace("master");
        }
        return window.mixpanel_data.landing = false;
      };

      DashboardRouter.prototype.vanity = function(slug) {
        return HR.appController.slugDetector(slug, (function(resp) {
          var _page;
          if (resp.type === "contest") {
            this.navigate("contests/" + slug, {
              trigger: true,
              replace: true
            });
          } else if (resp.type === "hacker") {
            HR.requires(['compound/profile-views'], function() {
              var hacker_profile_view, hackermodel;
              hackermodel = HR.model("hacker-profile", {
                username: slug
              }).cached();
              hacker_profile_view = new HR.HackerProfileView({
                hacker: slug,
                model: hackermodel
              });
              HR.appController.setTitle("Hacker Profile");
              HR.appView.setContentView(hacker_profile_view);
              return HR.appController.set_contest_namespace("master");
            });
          } else {
            this.e404();
          }
          _page = "Unknown";
          if (resp.type === "hacker") {
            _page = "Hacker Profile";
          }
          if (resp.type === "contest") {
            _page = "Contest Home";
          }
          return window.mixpanel_data.landing = false;
        }), this);
      };

      DashboardRouter.prototype.hackerHackos = function(hacker_slug, page) {
        var hacker, hackos_collection;
        hackos_collection = HR.collection('hackerhackos', {
          id: hacker_slug,
          page: page
        }).cached();
        hacker = HR.model('hacker-profile', {
          username: hacker_slug
        }).cached();
        return HR.requires(['compound/hacker-hackos'], function() {
          var hacker_hackos_view;
          hacker_hackos_view = new HR.HackerHackosView({
            collection: hackos_collection,
            hacker: hacker,
            page: page
          });
          HR.appController.setTitle("Hacker Hackos Transactions");
          return HR.appView.setContentView(hacker_hackos_view);
        });
      };

      DashboardRouter.prototype.checklist = function(contest_slug, challenge_slug) {
        var challenge, checklist, fragment, fragments, that;
        fragment = Backbone.history.fragment;
        fragments = fragment.split("checklist");
        if (fragments[0] === "") {
          challenge_slug = contest_slug;
          contest_slug = null;
        } else {
          that = this;
          HR.appController.querySlug({
            slug: contest_slug,
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        checklist = new HR.ChecklistCollection();
        checklist.setChallenge(challenge_slug);
        checklist.fetch();
        challenge = new HR.ChallengeModel;
        challenge.setSlug(challenge_slug);
        challenge.fetch();
        return HR.requires(['compound/extra-views'], function() {
          var checklist_view;
          checklist_view = new HR.ChecklistView({
            collection: checklist,
            model: challenge
          });
          return HR.appView.setContentView(checklist_view);
        });
      };

      DashboardRouter.prototype.showgame = function(contest_slug, game_id) {
        var game_model, _arguments;
        _arguments = this.setUpContestSlug({
          route: "showgame",
          "arguments": arguments
        });
        contest_slug = _arguments[0];
        game_id = _arguments[1];
        game_model = new HR.GameModel();
        game_model.set('id', game_id);
        game_model.contest_slug = contest_slug;
        return game_model.fetch({
          success: (function(_this) {
            return function() {
              HR.requires(['compound/game-views'], function() {
                var showgame_view;
                showgame_view = new HR.ShowGameView({
                  model: game_model
                });
                showgame_view.contest_slug = contest_slug;
                return HR.appView.setContentView(showgame_view);
              });
              if (contest_slug === null) {
                contest_slug = "master";
              }
              return window.mixpanel_data.landing = false;
            };
          })(this)
        });
      };

      DashboardRouter.prototype.setUpContestSlug = function(params) {
        var fragment, fragments, that, _params;
        if (params == null) {
          params = {};
        }
        _params = [];
        fragment = Backbone.history.fragment;
        fragments = fragment.split(params.route);
        if (fragments[0] === "") {
          _params.push(null);
          _.each(params["arguments"], function(arg) {
            return _params.push(arg);
          }, this);
        } else {
          _params = params["arguments"];
          that = this;
          HR.appController.querySlug({
            slug: params["arguments"][0],
            callback: function(resp) {
              if (resp.type !== "contest") {
                return that.e404();
              }
            }
          });
        }
        return _params;
      };

      DashboardRouter.prototype.notifications = function(contest_slug, page) {
        var notifications_collection, _arguments;
        if (page == null) {
          page = 1;
        }
        _arguments = this.setUpContestSlug({
          route: "notifications",
          "arguments": arguments
        });
        contest_slug = _arguments[0];
        notifications_collection = new HR.NotificationsCollection({
          page: page
        });
        notifications_collection.cached({
          fetch: true
        });
        _.each(notifications_collection.models, function(model) {
          return model.markSeen();
        });
        HR.requires(['compound/extra-views'], function() {
          var notifications_view;
          notifications_view = new HR.NotificationsView({
            collection: notifications_collection
          });
          return HR.appView.setContentView(notifications_view);
        });
        if (contest_slug === null) {
          contest_slug = "master";
        }
        window.mixpanel_data.landing = false;
        return HR.appController.set_contest_namespace(contest_slug);
      };

      DashboardRouter.prototype.notificationsPage = function(page) {
        if (page == null) {
          page = 1;
        }
        return this.notifications('', page);
      };

      DashboardRouter.prototype.notificationsSingle = function(id) {
        var collection;
        collection = new HR.NotificationsCollection;
        collection.notif_id = id;
        collection.cached({
          fetch: true,
          success: function() {
            return HR.router.navigate("/notifications/page/" + collection.page);
          }
        });
        HR.requires(['compound/extra-views'], function() {
          var view;
          view = new HR.NotificationsView({
            collection: collection,
            notif_id: id
          });
          return HR.appView.setContentView(view);
        });
        return HR.appController.set_contest_namespace("master");
      };

      DashboardRouter.prototype.contestsLegacyRedirect = function(contest_slug) {
        return this.navigate("/contests/" + Backbone.history.fragment, true);
      };

      DashboardRouter.prototype.teams = function(contest_slug, team_id, action) {
        var fragment, fragments, team;
        fragment = Backbone.history.fragment;
        fragments = fragment.split("teams");
        if (fragments[0] === "") {
          action = team_id;
          team_id = contest_slug;
          contest_slug = null;
        }
        if (!team_id) {
          if (contest_slug) {
            this.navigate("contests/" + contest_slug + "/settings/teams", {
              trigger: true,
              replace: true
            });
          } else {
            this.navigate("/settings/teams", {
              trigger: true,
              replace: true
            });
          }
          return;
        }
        if (!action) {
          this.navigate("" + fragment + "/view", {
            trigger: true,
            replace: true
          });
          return;
        }
        team = new HR.TeamModel({
          id: team_id
        });
        return HR.requires(['compound/extra-views'], function() {
          var team_view;
          team_view = new HR.TeamView({
            model: team,
            action: action
          });
          return HR.appView.setContentView(team_view);
        });
      };

      DashboardRouter.prototype.teams_create = function(contest_slug) {
        return HR.requires(['compound/extra-views'], function() {
          var team_view;
          team_view = new HR.TeamView({});
          return HR.appView.setContentView(team_view);
        });
      };

      DashboardRouter.prototype.companies = function(slug) {
        var companies_collection;
        if (slug == null) {
          slug = null;
        }
        companies_collection = new HR.CompaniesCollection();
        if (slug !== null) {
          companies_collection.company_slug = slug;
        }
        companies_collection.contest_slug = HR.contest().get('slug');
        companies_collection.all = true;
        return companies_collection.fetch({
          success: (function(_this) {
            return function() {
              return HR.requires(['compound/extra-views'], function() {
                var companies_view;
                companies_view = new HR.CompaniesView({
                  collection: companies_collection
                });
                return HR.appView.setContentView(companies_view);
              });
            };
          })(this)
        });
      };

      DashboardRouter.prototype.inbox = function(thread_id) {
        var collection, view;
        if (thread_id == null) {
          thread_id = null;
        }
        view = HR.cachedMessageView;
        collection = HR.cachedMessagesCollection;
        if (collection && collection.length > 0) {
          thread_id || (thread_id = collection.first().get('id'));
        }
        HR.requires(['compound/extra-views'], function() {
          view = new HR.MessageThreadView({
            collection: collection,
            active_thread_id: thread_id
          });
          HR.cachedMessageView = view;
          return HR.appView.setContentView(view);
        });
        return HR.appController.set_contest_namespace("master");
      };

      DashboardRouter.prototype.specialRedirect = function() {
        return this.navigate("contests/project-euler", {
          trigger: true,
          replace: true
        });
      };

      return DashboardRouter;

    })(Backbone.Router);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.DashboardRouter = DashboardRouter;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var GenericView, HR, _ref;
    GenericView = (function(_super) {
      __extends(GenericView, _super);

      function GenericView() {
        return GenericView.__super__.constructor.apply(this, arguments);
      }

      GenericView.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.has_template = false;
        return this.parent = options.parent;
      };

      GenericView.prototype.assign = function(selector, view) {
        var selectors;
        if (_.isObject(selector)) {
          selectors = selector;
        } else {
          selectors = [];
          selectors[selector] = view;
        }
        if (!selectors) {
          return;
        }
        _.each(selectors, function(view, selector) {
          return view.setElement(this.$(selector)).render();
        }, this);
        return this;
      };

      GenericView.prototype.render = function() {
        if (this._render && typeof this._render === "function") {
          if (typeof this.prerender === "function") {
            this.prerender;
          }
          if (typeof this.teardown === "function") {
            this.teardown();
          }
          if (typeof this._render === "function") {
            this._render();
          }
          if (typeof this.postrender === "function") {
            this.postrender();
          }
        } else if (!this.has_template && this.template) {
          HR.appController.getTemplate(this.template, function(template) {
            this._template = template;
            this.has_template = true;
            return this.applyTemplate();
          }, this);
        } else {
          this.applyTemplate();
        }
        return this;
      };

      GenericView.prototype.postrender = function() {
        this.delegateEvents();
        return setTimeout(function() {
          return $('.js-tooltip').tooltip().click(function(e) {
            $('.js-tooltip').tooltip('hide');
            if ($(e.currentTarget).hasClass('disabled')) {
              return false;
            } else {
              return true;
            }
          });
        }, 300);
      };

      GenericView.prototype.applyTemplate = function() {};

      GenericView.prototype.loading = function(size, from) {
        if (size == null) {
          size = 32;
        }
        if (from == null) {
          from = 0;
        }
        if (this.rendered) {
          return;
        }
        return $(this.el).html(HR.appController.viewLoader(size));
      };

      GenericView.prototype.teardown = function() {
        var view, _i, _len, _ref;
        if (this._subviews !== void 0) {
          _ref = this._subviews;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            view = _ref[_i];
            view.remove();
          }
        }
        this._subviews = [];
        this.undelegateEvents();
        return this;
      };

      GenericView.prototype.destroy = function() {
        if (this._subviews && _.isArray(this._subviews)) {
          _.each(this._subviews, function(subview) {
            if (subview && subview.destroy) {
              return subview.destroy();
            }
          });
        }
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.remove();
        return Backbone.View.prototype.remove.call(this);
      };

      GenericView.prototype.add_subview = function(view) {
        if (!this._subviews) {
          this._subviews = [];
        }
        this._subviews.push(view);
        return this;
      };

      return GenericView;

    })(Backbone.View);
    HR = (_ref = window.HR) != null ? _ref : {};
    HR.GenericView = GenericView;
    return Backbone.View.prototype.log = Backbone.log;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var AppView, HR, _ref;
    AppView = (function(_super) {
      __extends(AppView, _super);

      function AppView() {
        return AppView.__super__.constructor.apply(this, arguments);
      }

      AppView.prototype.el = "#wrapper";

      AppView.prototype.initialize = function(options) {
        var that;
        if (!this.contentView) {
          this.setLoadingView();
        }
        that = this;
        return _.each(this.liveEvents, function(callback, index) {
          var ev, sl, sp;
          sp = index.indexOf(" ");
          ev = index.substr(0, sp);
          sl = index.substr(sp + 1);
          return $(sl).die(ev).unbind(ev).live(ev, that[callback]);
        });
      };

      AppView.prototype.setLoadingView = function() {
        var loadingView;
        loadingView = new HR.LoadingView;
        return this.setContentView(loadingView);
      };

      AppView.prototype.setContentView = function(contentView) {
        if (this.contentView) {
          if (this.contentView.unbind) {
            this.contentView.unbind();
          }
          if (this.contentView.$) {
            this.contentView.$('*').unbind();
          }
          if (this.contentView.destroy) {
            this.contentView.destroy();
          } else if (this.contentView.remove) {
            this.contentView.remove();
          }
        }
        this.contentView = contentView;
        return this.render();
      };

      AppView.prototype.liveEvents = {
        "click .backbone": "navigateAnchor",
        "click .mkd-cheat-sheet": "mkdCheatSheet"
      };

      AppView.prototype.navigateAnchor = function(e) {
        var href;
        if (e.ctrlKey || e.metaKey) {
          return true;
        }
        e.preventDefault();
        href = $(e.currentTarget).attr('href');
        if (href) {
          return HR.router.navigate(href, true);
        }
      };

      AppView.prototype.mkdCheatSheet = function(e) {
        var dialog_html;
        dialog_html = "<div class='hr-dialog-body'>\n    <div class='span12 clearfix margin-large bottom'>\n        <div class='row'>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Formatting</strong></h5>\n                <p><span class='beta'>#</span> Header 1</p>\n                <p><span class='beta'>##</span> Header 2</p>\n                <p><span class='beta'>######</span> Header 6</p>\n                <br>\n                <p><span class='beta'><strong>_</strong></span> This text will be <em>italic</em> <span class='beta'><strong>_</strong></span></p>\n                <p><span class='beta'><strong>*</strong></span> This text will be <em>italic</em> <span class='beta'><strong>*</strong></span></p>\n                <p><span class='beta'><strong>__</strong></span> This text will be <strong>bold</strong> <span class='beta'><strong>__</strong></span></p>\n                <p><span class='beta'><strong>**</strong></span> This text will be <strong>bold</strong> <span class='beta'><strong>**</strong></span></p>\n            </div>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Lists</strong></h5>\n                <p><span class='beta'><strong>*</strong></span> Unordered list item</p>\n                <p><span class='beta'><strong>*</strong></span> Unordered list item</p>\n                <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span class='beta'><strong>*</strong></span> Unordered list item</p>\n                <br>\n                <p><span class='beta'><strong>1.</strong></span> Ordered list item</p>\n                <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span class='beta'><strong>*</strong></span> Unordered list item</p>\n                <p><span class='beta'><strong>2.</strong></span> Ordered list item</p>\n            </div>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Code Blocks</strong></h5>\n                <p>Normal Text</p>\n                <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>\n                <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;echo `some function`</p>\n                <br>\n                <h5 class='margin-small bottom'><strong>Inline Code</strong></h5>\n                <p>Use <span class='beta'><strong>`</strong></span>&lt;div&gt;<span class='beta'><strong>`</strong></span> tags</p>\n                <small class='beta'>Two backticks to a character</small>\n                <p><span class='beta'><strong>``</strong></span>echo `unname -a`<span class='beta'><strong>``</strong></span></p>\n                <br>\n            </div>\n        </div>\n    </div>\n    <div class='span12 clearfix margin-large top bottom'>\n        <div class='row'>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Blockquotes</strong></h5>\n                <p>Like Steve Jobs said:</p>\n                <br>\n                <p>&gt;&emsp;Here's to the crazy ones</p>\n                <p>&gt;&emsp;The misfits. The rebels.</p>\n            </div>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Images</strong></h5>\n                <p><span class='beta'><strong>!</strong></span>[first prize](/images/prize.png)</p>\n                <p><span class='beta'><strong>!</strong></span>[Alt Text](url)</p>\n            </div>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Links</strong></h5>\n                <p>Checkout the next <span class='beta'><strong>[HackerRank competition!](http://hackerrank.com/contests)</strong></span></p>\n                <p><span class='beta'><strong>[</strong></span>inline text<span class='beta'><strong>](</strong></span>url<span class='beta'><strong>)</strong></span></p>\n            </div>\n        </div>\n    </div>\n</div>";
        return HR.util.ShowDialog({
          body: dialog_html,
          title: "Markdown Cheatsheet",
          width: 800
        }).render();
      };

      AppView.prototype.getSubViews = function() {
        var subviews;
        if (this.contentView === null) {
          this.setContentView(HR.E404View);
        }
        return subviews = {
          content: this.contentView
        };
      };

      AppView.prototype.showUsernamePrompt = function() {
        var dialog, profile, that;
        if (this.showUsernamePrompt !== true) {
          profile = HR.profile();
          if (profile.get("username_autoset") === true) {
            that = this;
            this.showUsernamePrompt = true;
            dialog = new HR.util.ShowFormDialog({
              title: "Set Username",
              width: 650,
              onDestroy: function() {
                profile.set('username_autoset', false);
                return profile.save();
              },
              fields: [
                {
                  name: "username",
                  value: profile.get('username'),
                  type: "text",
                  title: "Username"
                }
              ],
              body: "<p>Please set a username. This username will be used as your identifier on HackerRank.</p>",
              buttons: [
                {
                  name: 'Save',
                  callback: function(dialog) {
                    var $form, btn;
                    btn = this;
                    $form = dialog.$form();
                    btn.unSetFailedMsg();
                    return profile.save('username', _.escape(dialog.$el().find('input[name=username]').val()), {
                      success: function(model, response) {
                        var error_message;
                        if (_.size(response.model.errors) > 0) {
                          profile.set('username', response.model.username);
                          error_message = "";
                          _.each(response.model.errors, function(val, key) {
                            return error_message += val;
                          });
                          btn.failed(error_message);
                          return btn.$el.removeClass('disabled');
                        } else {
                          dialog.destroy();
                          profile.set('username_autoset', false);
                          return profile.save();
                        }
                      }
                    });
                  }
                }, {
                  name: 'Cancel',
                  callback: function(dialog) {
                    profile.set('username_autoset', false);
                    profile.save();
                    this.setInactive();
                    return dialog.destroy();
                  }
                }
              ]
            });
            return dialog.render();
          }
        }
      };

      AppView.prototype.render = function() {
        var curent_module_name, profile, that;
        if (Backbone.history.fragment && Backbone.history.fragment.substr(0, 5) === "tests") {
          HR.candidatetestmode = true;
        } else {
          HR.candidatetestmode = false;
        }
        if (!this.verifyAccountView) {
          this.verifyAccountView = new HR.VerifyAccountView({
            model: HR.profile()
          });
          this.add_subview(this.verifyAccountView);
        }
        this.verifyAccountView.setElement($(this.el).find("#verifyaccount")).render();
        if (!this.checkUsername) {
          profile = HR.profile();
          profile.bind("reset", this.showUsernamePrompt, this);
          this.showUsernamePrompt();
          this.checkUsername = true;
        }
        if (!this.navigationView) {
          this.navigationView = new HR.NavigationView({
            model: HR.profile(),
            contest: HR.contest()
          });
          this.add_subview(this.navigationView);
        }
        if (this.$("#page-header").length === 0) {
          this.navigationView.setElement($(this.el).find("#navigation")).render();
        }
        if (!this.contestNavigationView) {
          this.contestNavigationView = new HR.ContestNavigationView({
            contest: HR.model('contest', {
              slug: HR.appController.get_current_contest_slug()
            }).cached()
          });
          this.add_subview(this.contestNavigationView);
        }
        if (this.$("#contest-nav").length === 0) {
          this.contestNavigationView.setElement($(this.el).find("#contest-navigation")).render();
        }
        if (!this.sidebarView) {
          this.sidebarView = new HR.SidebarView;
          this.add_subview(this.sidebarView);
        }
        if (this.$("#sidebar").length === 0) {
          this.sidebarView.setElement($(this.el).find("#side-navigation")).render();
        }
        that = this;
        if (!this.countdownTimerView) {
          this.countdownTimerView = new HR.CountdownTimerView({
            model: HR.contest().cached()
          });
          this.add_subview(this.countdownTimerView);
        }
        this.countdownTimerView.setElement($(this.el).find("#countdowntimer")).render();
        _.each(this.getSubViews(), function(subview, name) {
          var _view;
          if (_.isFunction(subview)) {
            _view = new subview;
          } else {
            _view = subview;
          }
          $(that.el).find("#" + name).html(_view.render().el);
          return _view.trigger('render');
        });
        if ($(".module-select-prompt").length > 0 && $("body").find("[data-module=" + (HR.appController.get_current_module()) + "]").length > 0) {
          curent_module_name = $.trim($("body").find("[data-module=" + (HR.appController.get_current_module()) + "]").html());
          HR.CURRENT_MODULE_NAME = curent_module_name;
          return $(".module-select-prompt").html("Category: " + curent_module_name + " <i class='icon-down-open-mini'></i>");
        }
      };

      AppView;

      return AppView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.AppView = AppView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, LoadingView, _ref;
    LoadingView = (function(_super) {
      __extends(LoadingView, _super);

      function LoadingView() {
        return LoadingView.__super__.constructor.apply(this, arguments);
      }

      LoadingView.prototype.template = 'loading';

      LoadingView.prototype.className = 'loading-view';

      LoadingView.prototype.viewLoader = function(size) {
        if (size == null) {
          size = 32;
        }
        return "<div class='gray'> <div style='background: url(https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_" + size + "x" + size + ".gif); height: " + size + "px; width: " + size + "px; display: inline-block;'></div> </div>";
      };

      LoadingView.prototype.render = function() {
        $(this.el).html(this.viewLoader(64));
        return this;
      };

      return LoadingView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.LoadingView = LoadingView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var DashboardView, HR, _ref;
    DashboardView = (function(_super) {
      __extends(DashboardView, _super);

      function DashboardView() {
        return DashboardView.__super__.constructor.apply(this, arguments);
      }

      DashboardView.prototype.template = 'dashboard/base';

      DashboardView.prototype.className = 'dashboard-view';

      DashboardView.prototype.initialize = function(options) {
        this.hacker = HR.profile();
        this.dashboard = HR.model('dashboard').cached();
        this.listenTo(this.hacker, 'reset', this.render);
        this.listenTo(this.dashboard, 'reset', this.render);
        return HR.requires(['compound/highcharts'], (function() {}));
      };

      DashboardView.prototype.render = function() {
        if (!(this.hacker.sync_status && this.dashboard.sync_status)) {
          $(this.el).html(HR.appController.viewLoader(64));
          return this;
        }
        $(this.el).html(HR.appController.template(this.template, this)({
          model: this.dashboard.toJSON()
        }));
        this.historyView || (this.historyView = new HR.DashboardHistoryView({
          model: HR.profile().toJSON(),
          username: HR.profile().get('username')
        }));
        this.trackView || (this.trackView = new HR.DashboardTrackView({
          dashboard: this.dashboard
        }));
        this.submissionsView || (this.submissionsView = new HR.DashboardSubmissionsView());
        this.assign({
          '.dashboard_submissions': this.submissionsView,
          '.dashboard_tracks': this.trackView,
          '.dashboard_history': this.historyView
        });
        return this;
      };

      return DashboardView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.DashboardView = DashboardView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var DashboardHeaderView, HR, _ref;
    DashboardHeaderView = (function(_super) {
      __extends(DashboardHeaderView, _super);

      function DashboardHeaderView() {
        return DashboardHeaderView.__super__.constructor.apply(this, arguments);
      }

      DashboardHeaderView.prototype.template = 'dashboard/dashboard-header';

      DashboardHeaderView.prototype.className = 'dashboard-header';

      DashboardHeaderView.prototype.events = {
        "click .js-change-track": "changeTrack"
      };

      DashboardHeaderView.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.profile = HR.profile();
        this.profile.fetchScores();
        this.parent = options.parent;
        this.activeTab = options.activeTab;
        return this.listenTo(this.profile, 'reset', this.render);
      };

      DashboardHeaderView.prototype.changeTrack = function(e) {
        var track_slug;
        track_slug = $(e.currentTarget).attr("data-value");
        if (track_slug !== this.parent.current_track_slug) {
          if (this.parent.bodyView instanceof HR.TrackContestsView) {
            return HR.router.navigate("categories/" + track_slug + "/contests", true);
          } else {
            return HR.router.navigate("categories/" + track_slug, true);
          }
        }
      };

      DashboardHeaderView.prototype.renderScore = function() {
        var cat, scores;
        scores = this.profile.get('scores');
        if (_.isObject(scores) && _.isObject(scores[this.parent.current_track_slug])) {
          cat = this.activeTab === 'contest' ? 'contest' : 'practice';
          $(".js-hacker-rank").html(scores[this.parent.current_track_slug][cat].rank);
          $(".js-hacker-score").html(parseInt(scores[this.parent.current_track_slug][cat].score));
          $(".js-hacker-rating").removeClass("rg_1 rg_2 rg_3 rg_4 rg_5");
          return $(".js-hacker-rating").html(HR.util.ratingLevelToTitle(scores[this.parent.current_track_slug].contest.level)).addClass("rg_" + scores[this.parent.current_track_slug].contest.level);
        }
      };

      DashboardHeaderView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this)({
          current_track: HR.PREFETCH_DATA.tracks[this.parent.current_track_slug],
          activeTab: this.activeTab
        }));
        $(".js-categories-challenges").html("<li>" + HR.PREFETCH_DATA.tracks[this.parent.current_track_slug].categories_count + " categories</li> <li>" + HR.PREFETCH_DATA.tracks[this.parent.current_track_slug].challenges_count + " challenges</li>");
        this.renderScore();
        return this;
      };

      return DashboardHeaderView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.DashboardHeaderView = DashboardHeaderView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var DashboardHistoryView, HR, _ref;
    DashboardHistoryView = (function(_super) {
      __extends(DashboardHistoryView, _super);

      function DashboardHistoryView() {
        return DashboardHistoryView.__super__.constructor.apply(this, arguments);
      }

      DashboardHistoryView.prototype.template = 'dashboard/history';

      DashboardHistoryView.prototype.className = 'dashboard-history';

      DashboardHistoryView.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.history = HR.collection('dashboard-history');
        this.history.setHacker(this.model.username);
        this.history.cached();
        this.listenTo(this.history, 'reset', this.render);
        return this.listenTo(this.history, 'change', this.render);
      };

      DashboardHistoryView.prototype.setupChange = function() {
        var lastRank;
        lastRank = 0;
        this.maxRank = 0;
        this.lowestRank = null;
        return this.history.each((function(_this) {
          return function(event) {
            var change, currentRank;
            currentRank = event.get('rank');
            change = currentRank - lastRank;
            if (currentRank > _this.maxRank) {
              _this.maxRank = currentRank;
            }
            if (_this.lowestRank && currentRank < _this.lowestRank) {
              _this.lowestRank = currentRank;
            }
            event.set({
              increase: change >= 0,
              change: change,
              logged_at: new Date(event.get('logged_at'))
            }, {
              silent: true
            });
            return lastRank = currentRank;
          };
        })(this));
      };

      DashboardHistoryView.prototype.renderChart = function(options) {
        var defaultOptions, that;
        if (options == null) {
          options = {};
        }
        that = this;
        defaultOptions = {
          chart: {
            type: "line",
            zoomType: "x",
            backgroundColor: null,
            height: 250
          },
          colors: ["#00beff", "#9bc0e3"],
          title: {
            text: null
          },
          legend: {
            enabled: false
          },
          xAxis: {
            title: {
              text: null
            },
            categories: this.history.map((function(event) {
              return event.get('logged_at');
            })),
            labels: {
              enabled: false
            }
          },
          yAxis: {
            title: {
              text: null
            },
            labels: {
              enabled: false
            },
            gridLineWidth: 0,
            tickInterval: 100
          },
          credits: {
            enabled: false
          },
          series: [
            {
              data: this.history.map(function(event) {
                return {
                  y: that.maxRank - event.get('rank'),
                  event: event
                };
              }),
              name: "Rank"
            }
          ],
          tooltip: {
            formatter: function() {
              var change, change_color, change_sign, event, html, logged_at, rank;
              event = this.point.event;
              rank = event.get('rank');
              change = event.get('change');
              logged_at = event.get('logged_at');
              html = "<b>" + (event.get('rank')) + "</b>";
              if (rank !== change) {
                if (event.get('change') >= 0) {
                  change_color = "red";
                  change_sign = "+";
                } else {
                  change_color = "green";
                  change_sign = "-";
                }
                html += " (<span style=\"color:" + change_color + "\">" + change_sign + " " + (Math.abs(change)) + "</span>)";
              }
              html += "<br/><i>" + (logged_at.toDateString()) + "</i>";
              return html;
            }
          }
        };
        options = _.extend(defaultOptions, options);
        return HR.requires(['compound/highcharts'], (function(_this) {
          return function() {
            that = _this;
            return setTimeout(function() {
              if (that.$(".history-chart").length > 0) {
                return that.$(".history-chart").highcharts(options);
              }
            }, 0);
          };
        })(this));
      };

      DashboardHistoryView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this)({
          history: this.history,
          model: this.model
        }));
        if (!this.history.sync_status) {
          $(this.el).html(HR.appController.viewLoader());
          return this;
        }
        this.setupChange();
        if (this.history.length > 1) {
          this.renderChart();
        }
        return this;
      };

      return DashboardHistoryView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.DashboardHistoryView = DashboardHistoryView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, RatingHistoryView, _ref;
    RatingHistoryView = (function(_super) {
      __extends(RatingHistoryView, _super);

      function RatingHistoryView() {
        return RatingHistoryView.__super__.constructor.apply(this, arguments);
      }

      RatingHistoryView.prototype.template = 'dashboard/rating-history';

      RatingHistoryView.prototype.className = 'dashboard-rating-history';

      RatingHistoryView.prototype.initialize = function(options) {
        var that;
        if (options == null) {
          options = {};
        }
        this.rendered = false;
        that = this;
        this.model.fetchScores();
        this.listenTo(this.model, 'reset', this.render);
        this.listenTo(this.model, 'change', this.render);
        return $.ajax({
          async: false,
          url: "rest/hackers/" + (this.model.get('username')) + "/rating_histories",
          success: function(data, resp) {
            return that.data = data;
          }
        });
      };

      RatingHistoryView.prototype.events = {
        'change #track-selector': 'changeChart',
        'click .overall-chart': 'changeChartOverall',
        'click .last-year-chart': 'changeChartLastYear'
      };

      RatingHistoryView.prototype.popoverChange = function(object) {
        $('#startDatePicker').datetimepicker({
          pickTime: false
        });
        $('#endDatePicker').datetimepicker({
          pickTime: false
        });
        return $('.range-set').click(function() {
          var endDate, startDate, value;
          startDate = Date.parse($('#startDateInput').val());
          endDate = Date.parse($('#endDateInput').val());
          value = parseInt($('#track-selector').val());
          object.renderChart(object.data.models[value - 1], startDate, endDate);
          return object.renderScore(object.data.models[value - 1].category);
        });
      };

      RatingHistoryView.prototype.changeChartOverall = function() {
        var value;
        value = parseInt($('#track-selector').val());
        this.$(".last-year-chart").removeClass('is_active');
        this.$(".overall-chart").addClass('is_active');
        this.renderChart(this.data.models[value - 1]);
        return this.renderScore(this.data.models[value - 1].category);
      };

      RatingHistoryView.prototype.changeChartLastYear = function() {
        var lastYear, now, value;
        this.$(".last-year-chart").addClass('is_active');
        this.$(".overall-chart").removeClass('is_active');
        value = parseInt($('#track-selector').val());
        lastYear = new Date();
        now = new Date();
        lastYear.setYear(now.getFullYear() - 1);
        this.renderChart(this.data.models[value - 1], lastYear);
        return this.renderScore(this.data.models[value - 1].category);
      };

      RatingHistoryView.prototype.changeChart = function() {
        var value;
        value = parseInt($('#track-selector').val());
        this.renderChart(this.data.models[value - 1]);
        return this.renderScore(this.data.models[value - 1].category);
      };

      RatingHistoryView.prototype.renderChart = function(history, startDate, endDate, options) {
        var acceptedEvents, defaultOptions, event, prev, that, _i, _len, _ref;
        if (startDate == null) {
          startDate = null;
        }
        if (endDate == null) {
          endDate = null;
        }
        if (options == null) {
          options = {};
        }
        prev = 1200.0;
        _ref = history.events;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          event.rating = Math.floor(event.rating);
          event.change = event.rating - prev;
          prev = event.rating;
        }
        that = this;
        acceptedEvents = history.events.filter(function(event) {
          var eventDate;
          eventDate = new Date(event.date);
          if (startDate && (eventDate < startDate)) {
            return false;
          }
          if (endDate && (eventDate > endDate)) {
            return false;
          }
          return true;
        });
        defaultOptions = {
          chart: {
            zoomType: "x",
            backgroundColor: null,
            height: 420,
            spacingBottom: 20,
            marginLeft: 25
          },
          plotOptions: {
            line: {
              color: "#C2C7D0",
              lineWidth: 2
            }
          },
          title: {
            text: null
          },
          legend: {
            enabled: false
          },
          xAxis: {
            title: {
              text: null
            },
            labels: {
              enabled: false
            },
            tickPosition: "inside"
          },
          yAxis: {
            title: {
              text: "Score",
              margin: 15,
              style: {
                color: '#c2c7d0'
              }
            },
            tickInterval: 600,
            labels: {
              format: "{value}",
              x: 40,
              y: 20,
              style: {
                color: '#c2c7d0',
                fontWeight: 'bold',
                fontSize: '0.2em'
              }
            },
            gridLineWidth: 1,
            lineWidth: 1
          },
          credits: {
            enabled: false
          },
          series: [
            {
              data: acceptedEvents.map(function(event) {
                return {
                  x: new Date(event.date).getTime(),
                  y: event.rating,
                  event: event
                };
              }),
              type: 'line',
              name: "Rank",
              marker: {
                radius: 4,
                fillColor: "rgba(0,0,0,0)",
                lineColor: "#39424e",
                lineWidth: 2,
                enabled: true,
                states: {
                  hover: {
                    radius: 4,
                    fillColor: "#39424e",
                    lineColor: "#39424e",
                    lineWidth: 2,
                    enabled: true
                  }
                }
              }
            }
          ],
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.85)',
            borderRadius: '15',
            style: {
              color: '#eee',
              fontSize: '15px',
              fontWeight: '700'
            },
            formatter: function() {
              var colors, date, date_string, html, level_in_words;
              event = this.point.event;
              date = new Date(event.date);
              level_in_words = ["O(1)", "O(1)", "O(log N)", "O(N)", "O(N^2)", "O(2^N)"];
              colors = ["#2bc56d", "#2bc56d", "#32a1de", "#f65039", "#805ec9", "#c2c7d0"];
              date_string = function(date) {
                var curr_date, curr_month, curr_year, d, m_names;
                d = new Date(date);
                m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
                curr_date = d.getDate();
                curr_month = m_names[d.getMonth()];
                curr_year = d.getFullYear();
                return "" + curr_date + " " + curr_month + " " + curr_year;
              };
              return html = "" + event.contest_name + "<br/>Rating: <span style=\"color:" + colors[event.level] + "\">" + level_in_words[event.level] + "</span><br/>Score: " + event.rating + "<br/>" + (date_string(event.date));
            }
          }
        };
        options = _.extend(defaultOptions, options);
        that = this;
        return HR.requires(['compound/highcharts'], (function(_this) {
          return function() {
            _this.$("#rating-graph-tab").highcharts(options);
            return _this.$(".range-popover").clickover({
              onShown: function() {
                return that.popoverChange(that);
              }
            });
          };
        })(this));
      };

      RatingHistoryView.prototype.renderScore = function(track_val) {
        var score;
        if (_.isObject(this.model.get('scores')) && _.isObject(this.model.get('scores')[track_val])) {
          score = this.model.get('scores')[track_val];
          if (score.contest.score) {
            this.$('#hacker-contest-rating').html(parseInt(score.contest.score));
          } else {
            this.$('#hacker-contest-rating').html("N/A");
          }
          if (score.contest.rank) {
            this.$('#hacker-contest-rank').html(score.contest.rank);
          } else {
            this.$('#hacker-contest-rank').html("N/A");
          }
          if (score.practice.score) {
            this.$('#hacker-practice-rating').html(parseInt(score.practice.score));
          } else {
            this.$('#hacker-practice-rating').html("N/A");
          }
          if (score.practice.rank) {
            this.$('#hacker-practice-rank').html(score.practice.rank);
          } else {
            this.$('#hacker-practice-rank').html("N/A");
          }
          if (score.contest.level) {
            this.$('#hacker-title').html(HR.util.ratingLevelToTitle(score.contest.level));
            this.$('#hacker-title').removeClass("rg_1 rg_2 rg_3 rg_4 rg_5");
            return this.$('#hacker-title').addClass("rg_" + score.contest.level);
          } else {
            return this.$('#hacker-title').html("N/A");
          }
        } else {
          this.$('#hacker-rating').html("N/A");
          this.$('#hacker-rank').html("N/A");
          return this.$('#hacker-title').html("N/A");
        }
      };

      RatingHistoryView.prototype.render = function() {
        var history, index, rating, tracks, _i, _len, _ref;
        if (this.data && this.model.sync_status) {
          tracks = [];
          _ref = this.data.models;
          for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
            history = _ref[index];
            tracks.push({
              id: index + 1,
              text: history.category,
              count: history.events.length
            });
          }
          rating = this.model.get('current_rating');
          $(this.el).html(HR.appController.template(this.template, this)({
            model: tracks,
            rating: rating,
            data: this.data
          }));
          $("#track-selector").select2();
          this.$(".overall-chart").addClass('is_active');
          this.renderChart(this.data.models[0]);
          this.renderScore(tracks[0].text);
        }
        return this;
      };

      return RatingHistoryView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.RatingHistoryView = RatingHistoryView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var DashboardSubmissionView, HR, _ref;
    DashboardSubmissionView = (function(_super) {
      __extends(DashboardSubmissionView, _super);

      function DashboardSubmissionView() {
        return DashboardSubmissionView.__super__.constructor.apply(this, arguments);
      }

      DashboardSubmissionView.prototype.template = 'dashboard/submission';

      DashboardSubmissionView.prototype.className = 'dashboard-submission-view';

      DashboardSubmissionView.prototype.initialize = function(options) {
        this.model = options.model;
        return this.listenTo(this.model, 'reset', this.render);
      };

      DashboardSubmissionView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this)({
          model: this.model.toJSON()
        }));
        return this;
      };

      return DashboardSubmissionView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.DashboardSubmissionView = DashboardSubmissionView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var DashboardSubmissionsView, HR, _ref;
    DashboardSubmissionsView = (function(_super) {
      __extends(DashboardSubmissionsView, _super);

      function DashboardSubmissionsView() {
        return DashboardSubmissionsView.__super__.constructor.apply(this, arguments);
      }

      DashboardSubmissionsView.prototype.template = 'dashboard/submissions';

      DashboardSubmissionsView.prototype.className = 'dashboard-submissions-view';

      DashboardSubmissionsView.prototype.initialize = function(options) {
        this.submissions = HR.collection('submissions').cached();
        return this.listenTo(this.submissions, 'reset', this.render);
      };

      DashboardSubmissionsView.prototype.render = function() {
        var submissions;
        $(this.el).html("<p class='block-margin'>You have not submitted a solution to any challenges yet.</p>");
        submissions = $('<div>');
        if (this.submissions.length) {
          _.each(this.submissions.slice(0, 5), (function(_this) {
            return function(model) {
              var submissionView;
              submissionView = new HR.DashboardSubmissionView({
                model: model
              });
              return submissions.append(submissionView.render().el);
            };
          })(this));
          $(this.el).html(submissions);
        }
        return this;
      };

      return DashboardSubmissionsView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.DashboardSubmissionsView = DashboardSubmissionsView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var DashboardTrackView, HR, _ref;
    DashboardTrackView = (function(_super) {
      __extends(DashboardTrackView, _super);

      function DashboardTrackView() {
        return DashboardTrackView.__super__.constructor.apply(this, arguments);
      }

      DashboardTrackView.prototype.template = 'dashboard/track';

      DashboardTrackView.prototype.className = 'dashboard-track-view';

      DashboardTrackView.prototype.initialize = function(options) {
        this.dashboard = options.dashboard;
        this.progress = HR.model('dashboard-progress').cached();
        return this.listenTo(this.progress, 'reset', this.render);
      };

      DashboardTrackView.prototype.events = {
        'click .track-select': 'trackSelect'
      };

      DashboardTrackView.prototype.currentName = function() {
        if (!this.track) {
          return "All Tracks";
        }
        return this.track.get('name');
      };

      DashboardTrackView.prototype.trackSelect = function(e) {
        var el;
        el = $(e.currentTarget);
        this.track_id = el.attr('data-track-id') || null;
        this.track = this.progress.tracks().get(this.track_id);
        return this.render();
      };

      DashboardTrackView.prototype.stats = function() {
        var stats;
        stats = this.progress.stats(this.track_id);
        if (stats.languages) {
          stats.languages[0] = "<strong>" + stats.languages[0] + "</strong>";
        }
        return stats;
      };

      DashboardTrackView.prototype.renderChart = function(options) {
        var defaultOptions, stats;
        if (options == null) {
          options = {};
        }
        stats = this.stats();
        defaultOptions = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: null,
            height: 250
          },
          colors: ["#2674c6", "#ddd9d9"],
          title: {
            text: null
          },
          tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage}%</b>",
            percentageDecimals: 1
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: false
              },
              innerSize: '30%',
              startAngle: -90
            }
          },
          series: [
            {
              type: "pie",
              name: "Challenges share",
              data: [
                {
                  name: "Completed",
                  y: stats.completion,
                  sliced: true,
                  selected: true
                }, {
                  name: "Remaining",
                  y: 100 - stats.completion
                }
              ]
            }
          ]
        };
        options = _.extend(defaultOptions, options);
        return HR.requires(['compound/highcharts'], (function(_this) {
          return function() {
            return $(".track-chart").highcharts(options);
          };
        })(this));
      };

      DashboardTrackView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this)({
          model: this.progress.toJSON(),
          stats: this.stats(),
          currentName: this.currentName()
        }));
        if (!this.progress.sync_status) {
          $(this.el).html(HR.appController.viewLoader());
          return this;
        }
        this.renderChart();
        this.delegateEvents();
        return this;
      };

      return DashboardTrackView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.DashboardTrackView = DashboardTrackView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TrackContestsView, _ref;
    TrackContestsView = (function(_super) {
      __extends(TrackContestsView, _super);

      function TrackContestsView() {
        return TrackContestsView.__super__.constructor.apply(this, arguments);
      }

      TrackContestsView.prototype.template = 'dashboard/track-contests';

      TrackContestsView.prototype.className = 'track-contests';

      TrackContestsView.prototype.initialize = function(options) {
        this.current_track_slug = options.current_track_slug;
        this.contest_slug = options.contest_slug;
        this.contest = options.contest;
        this.profile = HR.profile();
        this.collection = options.collection;
        this.listenTo(this.collection, 'reset', this.render);
        if (this.contest) {
          this.listenTo(this.contest, 'reset', this.render);
        }
        this.listenTo(this, 'render', this.adjustChallengeListHeight);
        return this.listenTo(this.profile, 'sync', this.refreshCollection);
      };

      TrackContestsView.prototype.refreshCollection = function() {
        var that;
        that = this;
        return this.collection.fetch({
          success: function() {
            return that.render();
          }
        });
      };

      TrackContestsView.prototype.events = {
        "click .contest_signup": "showLogin",
        "click .contest-signup": "contestSignup",
        "click .contest-enter": "contestEnter",
        "click .contest-contest": "contestContest",
        "click .change-contest": "changeContest",
        "click .js-next": "showNext",
        "click .js-prev": "showPrev"
      };

      TrackContestsView.prototype.showNext = function(e) {
        e.preventDefault();
        if (this.collection.total <= this.collection.page * this.collection.limit) {
          return;
        }
        this.collection.contest_slug = null;
        this.collection.page += 1;
        this.collection.sync_status = false;
        this.collection.cached();
        return this.render();
      };

      TrackContestsView.prototype.showPrev = function(e) {
        e.preventDefault();
        if (this.collection.page === 1) {
          return;
        }
        this.collection.contest_slug = null;
        this.collection.page -= 1;
        this.collection.sync_status = false;
        this.collection.cached();
        return this.render();
      };

      TrackContestsView.prototype.changeContest = function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.page = 1;
        this.challenges = null;
        this.contest_slug = $(e.currentTarget).attr("data-slug");
        this.contest = new HR.ContestModel({
          slug: this.contest_slug
        });
        this.contest.cached();
        this.listenTo(this.contest, 'reset', this.render);
        HR.router.navigate("categories/" + this.current_track_slug + "/contests/" + this.contest_slug, false);
        this.render();
        return false;
      };

      TrackContestsView.prototype.setActive = function() {
        if (!this.collection.sync_status) {
          return;
        }
        if (this.contest_slug) {
          if (!(this.contest && this.contest.sync_status)) {
            return;
          }
        }
        if (!this.contest_slug) {
          if (!this.contest_slug && this.collection.grouped()[0].contests.length > 0) {
            this.contest_slug = this.collection.grouped()[0].contests.first().get('slug');
          }
          if (this.contest_slug) {
            this.contest = new HR.ContestModel({
              slug: this.contest_slug
            }).cached();
          }
        }
        _.each(this.collection.models, (function(_this) {
          return function(model) {
            if (model.get('slug') === _this.contest_slug) {
              return model.active = true;
            } else {
              return model.active = false;
            }
          };
        })(this));
        if (!this.challenges) {
          this.challenges = HR.collection('challenges');
          this.challenges.setContest(this.contest_slug);
          this.challenges.setPage(this.page);
          this.challenges.setLoginTracking(true);
          this.challenges.cached();
          this.listenTo(this.challenges, 'reset', this.render);
        }
        return true;
      };

      TrackContestsView.prototype.adjustChallengeListHeight = function() {
        var challengesList, minHeight;
        challengesList = this.$('div.challenges-list');
        minHeight = Math.max(this.$('.inline-sidebar').height() || 1, challengesList.height() || 1);
        if (minHeight > 0) {
          return challengesList.css('min-height', minHeight);
        }
      };

      TrackContestsView.prototype.render = function() {
        var background_image, button, challengesContainer, challenges_div, contest_button, enter_button, message, signup_button, tabsContainer;
        this.setActive();
        HR.appController.set_contest_namespace("master");
        $(this.el).html(HR.appController.template(this.template, this)({
          contests: this.collection,
          profile: this.profile,
          contest: this.contest,
          contest_slug: this.contest_slug
        }));
        if (this.collection.sync_status) {
          tabsContainer = {};
          _.each(this.collection.grouped(), (function(_this) {
            return function(group) {
              tabsContainer = $();
              _.each(group.contests.models, function(model) {
                var _view;
                _view = new HR.ContestsTabView({
                  model: model,
                  custom_template: 'dashboard/track-contest-list'
                });
                tabsContainer.push(_view.setElement("<li class='lg-block_head challenges_track-toggle " + (model.active ? 'current' : '') + "'></li>").render().el);
                return this.add_subview(_view);
              }, _this);
              return _this.$("." + group.key + "_contests").html(tabsContainer);
            };
          })(this));
        } else {
          this.$(".active_contests").html(HR.appController.viewLoader(32));
          this.$(".archived_contests").html(HR.appController.viewLoader(32));
        }
        challenges_div = this.$("div.challenges-list");
        if (this.contest && this.contest.sync_status) {
          if (this.contest.get('archived') || (this.contest.get('started') && this.contest.get('signed_up'))) {
            if (this.challenges && (this.challenges.sync_status || this.challenges.length > 0)) {
              challengesContainer = $();
              _.each(this.challenges.models, function(challenge) {
                var _view;
                _view = new HR.ChallengesListView({
                  contest: this.contest,
                  model: challenge,
                  id: parseInt(Math.random() * 1000000)
                });
                challengesContainer.push(_view.render().el);
                return this.add_subview(_view);
              }, this);
              challenges_div.html(challengesContainer);
              HR.util.pagination(this.$('.pagination-wrapper'), this.challenges.getTotal(), "" + (this.challenges.pageURL()) + "/", this.challenges.getCurrentPage(), null, this.challenges.limit);
            } else {
              challenges_div.html(HR.appController.viewLoader(64));
            }
          } else {
            signup_button = "<button class='btn btn-primary btn-large contests_pane-CTAbtn contest-signup'>Register</button>";
            enter_button = "<button class='btn btn-primary btn-large contests_pane-CTAbtn contest-enter'>Solve Challenges</button>";
            contest_button = "<button class='btn btn-primary btn-large contests_pane-CTAbtn contest-contest'>View Contest</button>";
            if (!this.contest.get('started') && this.contest.get('signed_up')) {
              message = "<p class='aside contests_pane-message'>You have registered for the contest.</p>";
              button = contest_button;
            } else if (this.contest.get('started') && !this.contest.get('signed_up')) {
              message = "<p class='aside contests_pane-message'>You have not registered for the contest. " + "The contest is in progress. Please register to start solving challenges.</p>";
              button = signup_button;
            } else if (!this.contest.get('started') && !this.contest.get('signed_up')) {
              message = "<p class='aside contests_pane-message'>You have not registered for the contest. " + "Please register to participate.</p>";
              button = signup_button;
            } else if (this.contest.get('started') && this.contest.get('signed_up')) {
              message = "<p class='aside contests_pane-message'>Contest has started.</p>";
              button = enter_button;
            }
            background_image = this.contest.get('homepage_background_image') || '/assets/hackergames/hacker-games-mountains.jpg';
            challenges_div.html("<div class='text-center'>\n  <div class=\"contests_pane\">\n      <h3 class=\"alpha contests_pane-title\">" + (this.contest.get('name')) + "</h3>\n      <p>" + (this.contest.get('description')) + "</p>\n  </div>\n  " + message + "\n  " + button + "\n</div>");
          }
        }
        this.trigger('render');
        return this;
      };

      TrackContestsView.prototype.contestSignup = function(e) {
        var current_text, that;
        e.preventDefault();
        if ($(e.currentTarget).attr("disabled") === "disabled") {
          return;
        }
        current_text = $(e.currentTarget).html();
        $(e.currentTarget).html("Signing up...");
        $(e.currentTarget).attr("disabled", "disabled");
        that = this;
        return $.ajax({
          type: "POST",
          beforeSend: function(xhr) {
            return xhr.setRequestHeader("X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content"));
          },
          url: "/rest/contests/" + this.contest_slug + "/signup",
          data: {
            contest_crp: $.cookie("" + this.contest_slug + "_crp")
          },
          success: (function(_this) {
            return function(data) {
              var profile;
              mixpanel.push([
                'track', "Contest Signup", {
                  contest: _this.contest_slug,
                  username: HR.profile().get('username')
                }
              ]);
              if (data.status) {
                that.contest.fetch({
                  success: function() {
                    return that.render();
                  }
                });
                return that.collection.fetch({
                  success: function() {
                    return that.render();
                  }
                });
              } else {
                profile = HR.profile();
                if (profile.isLoggedIn()) {
                  alert(data.message);
                } else {
                  (new HR.util.ShowLoginDialog({
                    show_sign_up_link: true,
                    error_message: data.message
                  })).render();
                }
                $(e.currentTarget).html(current_text);
                return $(e.currentTarget).removeAttr("disabled");
              }
            };
          })(this)
        });
      };

      TrackContestsView.prototype.contestEnter = function(e) {
        e.preventDefault();
        if ($(e.currentTarget).attr("disabled") === "disabled") {
          return;
        }
        $(e.currentTarget).html("Entering...");
        $(e.currentTarget).attr("disabled", "disabled");
        return HR.router.navigate("/contests/" + this.contest_slug + "/challenges", {
          trigger: true,
          replace: true
        });
      };

      TrackContestsView.prototype.contestContest = function(e) {
        e.preventDefault();
        if ($(e.currentTarget).attr("disabled") === "disabled") {
          return;
        }
        $(e.currentTarget).attr("disabled", "disabled");
        return window.location = "/" + this.contest_slug;
      };

      TrackContestsView.prototype.showLogin = function(e) {
        var element, login;
        e.preventDefault();
        element = $(e.target);
        login = HR.util.ShowLoginDialog({
          contest: element.attr("data-contest"),
          show_sign_up_link: true
        });
        return login.render();
      };

      TrackContestsView.prototype.showNext = function(e) {
        e.preventDefault();
        this.collection.contest_slug = null;
        this.collection.page += 1;
        this.collection.sync_status = false;
        this.collection.cached();
        return this.render();
      };

      TrackContestsView.prototype.showPrev = function(e) {
        e.preventDefault();
        this.collection.contest_slug = null;
        this.collection.page -= 1;
        this.collection.sync_status = false;
        this.collection.cached();
        return this.render();
      };

      return TrackContestsView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.TrackContestsView = TrackContestsView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, TrackDashboardView, _ref;
    TrackDashboardView = (function(_super) {
      __extends(TrackDashboardView, _super);

      function TrackDashboardView() {
        return TrackDashboardView.__super__.constructor.apply(this, arguments);
      }

      TrackDashboardView.prototype.template = 'dashboard/dashboard-track';

      TrackDashboardView.prototype.className = 'dashboard-track';

      TrackDashboardView.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.current_track_slug = options.current_track_slug;
        this.current_chapter_slug = options.current_chapter_slug;
        this.contest = options.contest;
        this.activeTab = options.activeTab || 'challenge';
        this.headerView = new HR.DashboardHeaderView($.extend(options, {
          parent: this
        }));
        if (this.activeTab === 'challenge') {
          return this.bodyView = new HR.ChallengesView(options);
        } else {
          return this.bodyView = new HR.TrackContestsView(options);
        }
      };

      TrackDashboardView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this)({
          current_track: HR.PREFETCH_DATA.tracks[this.current_track_slug]
        }));
        this.renderSubviews();
        return this;
      };

      TrackDashboardView.prototype.renderSubviews = function() {
        this.headerView.setElement(this.$(".view_header")).render();
        return this.bodyView.setElement(this.$(".view_body")).render();
      };

      return TrackDashboardView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.TrackDashboardView = TrackDashboardView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, VerifyAccountView, _ref;
    VerifyAccountView = (function(_super) {
      __extends(VerifyAccountView, _super);

      function VerifyAccountView() {
        return VerifyAccountView.__super__.constructor.apply(this, arguments);
      }

      VerifyAccountView.prototype.template = 'dashboard/verify-account';

      VerifyAccountView.prototype.className = 'verify-account-view';

      VerifyAccountView.prototype.events = {
        "click a.send-verification": "sendVerification",
        "click .close": "closeVerification"
      };

      VerifyAccountView.prototype.sendVerification = function(e) {
        var fetch_loop, that;
        this.setVerificationStatus(1);
        that = this;
        fetch_loop = function() {
          that.model.disableThrobber = true;
          return that.model.fetch({
            success: function(model) {
              if (model.get('confirmed') === false) {
                that.model.disableThrobber = false;
                return setTimeout(fetch_loop, 1500);
              }
            }
          });
        };
        return $.ajax({
          url: "/auth/send_confirmation" + (HR.appController.get_current_contest_slug_url()),
          success: function(data) {
            that.setVerificationStatus(2);
            return fetch_loop();
          }
        });
      };

      VerifyAccountView.prototype.setVerificationStatus = function(status) {
        this.verification_sent_status = status;
        return this.render();
      };

      VerifyAccountView.prototype.initialize = function(options) {
        this.listenTo(this.model, 'reset', this.render);
        this.listenTo(this.model, 'change', this.render);
        return this.verification_sent_status = 0;
      };

      VerifyAccountView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this, false)({
          model: this.model,
          _model: this.model.toJSON(),
          verification_sent_status: this.verification_sent_status
        }));
        this.delegateEvents();
        return this;
      };

      VerifyAccountView.prototype.closeVerification = function() {
        return $(this.el).css('display', 'none');
      };

      VerifyAccountView.prototype.navigateTabs = function(e) {
        e.preventDefault();
        $(e.currentTarget).parents('ul').find('li').removeClass('active');
        return $(e.currentTarget).parents('li').addClass('active');
      };

      return VerifyAccountView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.VerifyAccountView = VerifyAccountView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, NavLogoView, _ref;
    NavLogoView = (function(_super) {
      __extends(NavLogoView, _super);

      function NavLogoView() {
        return NavLogoView.__super__.constructor.apply(this, arguments);
      }

      NavLogoView.prototype.className = 'nav-logo';

      NavLogoView.prototype.render = function() {
        if (!this.template) {
          this.template = $(_.template("<a href='/' class='HackerRankLogo backbone page_header-logo'><svg width='42' height='46'><image xlink:href='/assets/brand/h_mark_sm.svg' src='/assets/brand/h_mark_sm.png' width='42' height='46' /> </svg></a>")());
        }
        if (this.$('a.HackerRankLogo').length === 0) {
          $(this.el).append(this.template);
        }
        return this;
      };

      return NavLogoView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.NavLogoView = NavLogoView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, NavButtonsView, _ref;
    NavButtonsView = (function(_super) {
      __extends(NavButtonsView, _super);

      function NavButtonsView() {
        return NavButtonsView.__super__.constructor.apply(this, arguments);
      }

      NavButtonsView.prototype.template = 'nav-buttons';

      NavButtonsView.prototype.className = 'nav-buttons-view';

      NavButtonsView.prototype.initialize = function(options) {
        this.profile = HR.profile();
        return this.listenTo(this.profile, 'reset', this.render);
      };

      NavButtonsView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this)({
          profile: this.profile,
          contest: HR.contest().cached()
        }));
        if (HR.tab) {
          HR.util.setTab(HR.tab);
        }
        if (this.$("li#tab-contests").length > 0) {
          if (!this.contests) {
            this.contests = HR.collection('contests').cached();
            this.listenTo(this.contests, 'reset', this.updateContestNotificationsCount);
          }
          this.updateContestNotificationsCount();
        }
        if (this.$('span.search_form').length > 0) {
          if (!this.search_view) {
            this.search_view = new HR.AppSearchView;
          }
          this.search_view.setElement(this.$('span.search_form')).render();
          this.add_subview(this.search_view);
        }
        return this;
      };

      NavButtonsView.prototype.updateLinks = function() {
        this.render();
        this.$('#tab-challenges a.backbone').attr("href", "" + (HR.appController.get_current_contest_namespace()) + "/challenges");
        this.$('#tab-submissions a.backbone').attr("href", "" + (HR.appController.get_current_contest_namespace()) + "/submissions");
        this.$('#tab-leaderboard a.backbone').attr("href", "" + (HR.appController.get_current_contest_namespace()) + "/leaderboard");
        if (this.$("li#tab-contests").length > 0) {
          if (HR.appController.is_using_contest_namespace()) {
            return this.$('#tab-contests').remove();
          } else {
            return this.$('#tab-contests a.backbone').attr("href", "/contests").show();
          }
        }
      };

      NavButtonsView.prototype.updateContestNotificationsCount = function() {
        var ongoing_count;
        if (this.contests && this.contests.sync_status === true) {
          ongoing_count = _.reduce(_.map(this.contests.models, function(model) {
            if (model.get('started') && !model.get('ended')) {
              return 1;
            } else {
              return 0;
            }
          }), function(result, num) {
            return result + num;
          }, 0);
          if (ongoing_count > 0) {
            return this.$("#contests-badge").html(ongoing_count).fadeIn();
          } else {
            return this.$("#contests-badge").html("").fadeOut();
          }
        } else {
          return this.$("#contests-badge").html("").fadeOut();
        }
      };

      return NavButtonsView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.NavButtonsView = NavButtonsView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, NavLoginPatchView, _ref;
    NavLoginPatchView = (function(_super) {
      __extends(NavLoginPatchView, _super);

      function NavLoginPatchView() {
        return NavLoginPatchView.__super__.constructor.apply(this, arguments);
      }

      NavLoginPatchView.prototype.template = 'nav-login-patch';

      NavLoginPatchView.prototype.className = 'nav-login-patch-view';

      NavLoginPatchView.prototype.events = {
        "click a.logout-button": "logoutButton",
        "click a.login": "login"
      };

      NavLoginPatchView.prototype.initialize = function(options) {
        this.profile = HR.profile();
        this.listenTo(this.profile, 'reset', this.render);
        this.listenTo(this.profile, 'change', this.render);
        this.contest = HR.contest().cached();
        this.listenTo(this.contest, 'reset', this.setTeamName);
        return this.listenTo(this.contest, 'sync', this.setTeamName);
      };

      NavLoginPatchView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this)({
          profile: this.profile,
          _profile: this.profile.toJSON()
        }));
        return this;
      };

      NavLoginPatchView.prototype.setTeamName = function() {
        var that;
        if (this.contest.get("team_event") && this.profile.get("id")) {
          this.team = new HR.TeamModel;
          this.team.set("contest_id", this.contest.get("id"));
          that = this;
          return this.team.fetch({
            success: function(model, response, options) {
              var slug;
              slug = model.get("slug");
              if (slug) {
                return that.$(".team-name").html("(" + slug + ")").show();
              } else {
                return that.$(".team-name").html("").hide();
              }
            }
          });
        } else if (!this.contest.get("team_event")) {
          return this.$(".team-name").html("").hide();
        }
      };

      NavLoginPatchView.prototype.login = function(e) {
        e.preventDefault();
        return (new HR.util.ShowLoginDialog({
          show_sign_up_link: true
        })).render();
      };

      NavLoginPatchView.prototype.logoutButton = function(e) {
        return this.logout();
      };

      NavLoginPatchView.prototype.logout = function() {
        return $.ajax({
          url: "/auth/logout",
          type: "DELETE",
          success: function(data) {
            return document.location.href = "" + document.location.protocol + "//" + document.location.host;
          }
        });
      };

      return NavLoginPatchView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.NavLoginPatchView = NavLoginPatchView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var AppSearchView, HR, _ref;
    AppSearchView = (function(_super) {
      __extends(AppSearchView, _super);

      function AppSearchView() {
        return AppSearchView.__super__.constructor.apply(this, arguments);
      }

      AppSearchView.prototype.template = 'dashboard/app-search';

      AppSearchView.prototype.className = 'app-search-view';

      AppSearchView.prototype.events = {
        'focus #search-text': 'focusSearchBox',
        'blur #search-text': 'unfocusSearchBox'
      };

      AppSearchView.prototype.focusSearchBox = function() {
        return $(".search_form").addClass("focus");
      };

      AppSearchView.prototype.unfocusSearchBox = function() {
        return $(".search_form").removeClass("focus");
      };

      AppSearchView.prototype.renderHacker = function(item) {
        var ns;
        ns = item.url;
        return $("<a class='no-padding' style='background: none !important; border: none !important;'></a>").append($("<div class='search-row'> <div class='pull-left'> <img src='" + item.avatar + "' width='25' height='25' class='avatar' style='margin-top: 10px' onerror=\"this.onerror=null; this.src='https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg';\"/> </div> <div class='search-content margin-small left'> <p class=''>" + item.name + "</p> </div> </div>"));
      };

      AppSearchView.prototype.renderChallenge = function(item) {
        var ns;
        ns = item.url;
        return $("<a class='no-padding' style='background: none !important; border: none !important;'></a>").append($("<div class='search-row'> <div class='search-content'> <p class=''>" + item.name + "</p> </div> <span class='search-aside pull-right'> <ul class='inline inverse pull-right'> <li> <a href='" + ns + "/submissions' class='backbone no-padding'><i class='icon-list-bullet-small'></i></a> </li> <li> <a href='" + ns + "/leaderboard' class='backbone submit no-padding' data-analytics='ChallengeLeaderboard'><i class='icon-trophy'></i></a> </li> <li> <a href='" + ns + "/forum/questions' class='backbone submit no-padding' data-analytics='ViewForum'><i class='icon-comment'></i></a> </li> </ul> </span> </div>"));
      };

      AppSearchView.prototype.renderContest = function(item) {
        var icon_class, ns, text;
        ns = item.url;
        if (item.status === "ended") {
          icon_class = "completed";
          text = "(archived)";
        } else if (item.status === "running") {
          icon_class = "active";
          text = "(in progress)";
        } else {
          icon_class = "pending";
          text = "(not started)";
        }
        return $("<a class='no-padding' style='background: none !important; border: none !important;'></a>").append($("<div class='search-row'> <i class='status-indicator " + icon_class + " mmR'></i> <div class='search-content'> <p class=''>" + item.name + "</p> </div> <div class='contest_status pull-right'> <p>" + text + "</p> </div> </div>"));
      };

      AppSearchView.prototype.render = function() {
        var that;
        $(this.el).html(HR.appController.template(this.template, this));
        if (this.$("#search-text").length === 0) {
          return 0;
        }
        that = this;
        this.$("#search-text").autocomplete({
          minLength: 2,
          source: function(request, response) {
            that.$('.search-input i').removeClass('icon-search').append('<img height="20" src="/assets/ajax-view-loader.gif">');
            return $.ajax({
              url: "/appsearch?contest_slug=" + (HR.appController.get_current_contest_slug()),
              data: {
                query: request.term
              },
              success: function(data) {
                that.$('.search-input i').addClass('icon-search');
                that.$('.search-input img').remove();
                return response(_.map(data.challenges.concat(data.contests, data.hackers), function(babe) {
                  var type;
                  type = "hacker";
                  if (babe.challenge_association_id) {
                    type = "challenge";
                  } else if (babe.contest_id) {
                    type = "contest";
                  } else if (babe.blog_id) {
                    type = "blog";
                  }
                  babe.type = type;
                  if (babe.name.length > 30) {
                    babe.name = babe.name.substring(0, 30) + "…";
                  }
                  babe.value = babe.name;
                  return babe;
                }));
              }
            });
          },
          select: function(event, ui) {
            var url;
            if ($(event).srcElement && $(event).srcElement.tagName === "I") {
              return;
            }
            url = ui.item.url;
            return HR.router.navigate(url, true);
          }
        }).data("autocomplete")._renderItem = function(ul, item) {
          if (item.type === "hacker") {
            return $("<li style='border-bottom: none'></li>").data("item.autocomplete", item).append(that.renderHacker(item)).appendTo(ul);
          } else if (item.type === "contest") {
            return $("<li style='border-bottom: none'></li>").data("item.autocomplete", item).append(that.renderContest(item)).appendTo(ul);
          } else {
            return $("<li style='border-bottom: none'></li>").data("item.autocomplete", item).append(that.renderChallenge(item)).appendTo(ul);
          }
        };
        $(".ui-autocomplete").addClass("no-padding");
        return this;
      };

      return AppSearchView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.AppSearchView = AppSearchView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, NavigationView, _ref;
    NavigationView = (function(_super) {
      __extends(NavigationView, _super);

      function NavigationView() {
        return NavigationView.__super__.constructor.apply(this, arguments);
      }

      NavigationView.prototype.template = 'navigation';

      NavigationView.prototype.className = 'navigation-view';

      NavigationView.prototype.events = {
        "click .hr_nav_messages_link": "clickMessages",
        "click #notify_messages div.head": "stopPropogation",
        "click #notify_messages ul.hr_nav_messages_list": "stopPropogation",
        "click .send_message": "sendMessage",
        "click .hr_nav_notifications_link": "clickNotifications",
        "click #notify_broadcasts div.head": "stopPropogation",
        "click #notify_broadcasts ul.hr_nav_messages_list": "stopPropogation"
      };

      NavigationView.prototype.stopPropogation = function(e) {
        return e.stopPropagation();
      };

      NavigationView.prototype.clickNotifications = function() {
        var that;
        if (!this.notification_view) {
          that = this;
          return HR.requires(['compound/extra-views'], function() {
            that.notification_view = new HR.NavigationNotificationView;
            that.notification_view.setElement($("#notify_broadcasts"));
            return that.notification_view.render();
          });
        }
      };

      NavigationView.prototype.clickMessages = function() {
        var that;
        if (!this.message_view) {
          that = this;
          return HR.requires(['compound/extra-views'], function() {
            that.message_view = new HR.NavigationMessageView;
            that.message_view.setElement($("#notify_messages"));
            return that.message_view.render();
          });
        }
      };

      NavigationView.prototype.sendMessage = function() {
        var dialog;
        dialog = new HR.util.ShowMessageDialog;
        return dialog.render();
      };

      NavigationView.prototype.initialize = function(options) {
        var that, throttled_update_notifs, update_notifs;
        this.listenTo(this.model, 'reset', this.render);
        this.listenTo(this.model, 'change', this.render);
        this.contest = options.contest;
        this.profile = HR.profile();
        that = this;
        update_notifs = function() {
          if (HR.cachedNotificationsCollection) {
            HR.cachedNotificationsCollection.fetch({
              success: function() {
                return HR.cachedNotificationsCollection.trigger("reset");
              }
            });
          }
          return $.ajax({
            url: "/rest/contests/master/notifications/summary"
          }).done(function(data) {
            var tweet;
            that.log("Fetched notifications");
            if (_.isNumber(data.unread_count)) {
              that.unread_notifications_count = data.unread_count;
              that.updateNotificationsCount();
            }
            if (data.hacko_notification) {
              if (HR.profile().get('tour_done') && data.hacko_notification.message !== "") {
                tweet = data.hacko_notification.tweet;
                if (tweet === "") {
                  tweet = "I just earned hackos on @hackerrank https://www.hackerrank.com";
                }
                this.social_share || (this.social_share = new HR.SocialShareView({
                  title: "Hackos Earned!",
                  message: data.hacko_notification.message,
                  tweet: data.hacko_notification.tweet,
                  url: "https://www.hackerrank.com",
                  type: "hacko"
                }));
                this.social_share.render();
              }
            }
            if (data.hacko_count && that.hacko_count !== data.hacko_count) {
              that.hacko_count = data.hacko_count;
              return that.updateHackoCount();
            }
          });
        };
        throttled_update_notifs = _.throttle(update_notifs, 14950);
        this.notifications = (function(_this) {
          return function(throttled) {
            var notifications_url;
            if (throttled == null) {
              throttled = false;
            }
            if (HR.development) {
              return;
            }
            notifications_url = that.profile.get('notifications_url');
            if (!notifications_url) {
              that.listenToOnce(that.profile, 'reset', _this.notifications);
              return;
            }
            if (throttled) {
              that.log("Fetching throttled notifications");
              throttled_update_notifs();
            } else {
              that.log("Fetching notifications");
              update_notifs();
            }
            if (location.protocol === 'http:') {
              notifications_url = notifications_url.replace('https:', 'http:');
            }
            return $.ajax({
              url: notifications_url,
              success: function(data) {
                if (data) {
                  return that.notifications();
                } else {
                  return that.throttledNotifications(throttled = true);
                }
              },
              error: function(data) {
                return that.throttledNotifications(throttled = true);
              }
            });
          };
        })(this);
        this.throttledNotifications = _.throttle(this.notifications, 10000);
        return this.notifications();
      };

      NavigationView.prototype.render = function() {
        var that;
        this.rendered = true;
        $(this.el).html(HR.appController.template(this.template, this, false)({
          model: this.model,
          _model: this.model.toJSON(),
          _contest: this.contest.toJSON()
        }));
        if (this.$("span.nav-logo").length > 0) {
          if (!this.nav_view) {
            this.nav_view = new HR.NavLogoView;
          }
          this.nav_view.setElement(this.$("span.nav-logo")).render();
          this.add_subview(this.nav_view);
        }
        if (this.$("span.nav-buttons").length > 0) {
          if (!this.nav_buttons) {
            this.nav_buttons = new HR.NavButtonsView;
          }
          this.nav_buttons.setElement(this.$("span.nav-buttons")).render();
          this.add_subview(this.nav_buttons);
        }
        if (this.$("span.nav-login-patch").length > 0) {
          if (!this.nav_login_patch) {
            this.nav_login_patch = new HR.NavLoginPatchView;
          }
          this.nav_login_patch.setElement(this.$("span.nav-login-patch")).render();
          this.add_subview(this.nav_login_patch);
        }
        that = this;
        this.updateNotificationsCount();
        this.delegateEvents();
        return this;
      };

      NavigationView.prototype.updateNotificationsCount = function(count) {
        if (count == null) {
          count = -1;
        }
        if (count !== -1) {
          this.unread_notifications_count = count;
        }
        this.$(".hr_notifications_count").html("");
        if (this.unread_notifications_count > 0) {
          return this.$(".hr_notifications_count").html(this.unread_notifications_count);
        }
      };

      NavigationView.prototype.updateHackoCount = function() {
        if ($(".js-navigation-hacko-count") !== []) {
          return $(".js-navigation-hacko-count").html("Hackos: " + this.hacko_count);
        }
      };

      return NavigationView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.NavigationView = NavigationView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ContestNavigationView, HR, _ref;
    ContestNavigationView = (function(_super) {
      __extends(ContestNavigationView, _super);

      function ContestNavigationView() {
        return ContestNavigationView.__super__.constructor.apply(this, arguments);
      }

      ContestNavigationView.prototype.template = 'contest-navigation';

      ContestNavigationView.prototype.className = 'contest-navigation-view';

      ContestNavigationView.prototype.events = {
        "click #slideAwayToggle input": "toggleSlideAway"
      };

      ContestNavigationView.prototype.initialize = function(options) {
        this.contest = options.contest;
        return this.listenToOnce(this.contest, 'reset', this.render);
      };

      ContestNavigationView.prototype.toggleSlideAway = function(e) {
        var visibility;
        $("body").removeClass("sidebar-visible");
        $("body").removeClass("sidebar-not-visible");
        $(".page_navigation-sidebar").removeClass("toggle-open");
        visibility = e.currentTarget.checked ^ true;
        $.cookie("hr_sidebar_visibility", Number(visibility));
        return this.updateSidebar(visibility);
      };

      ContestNavigationView.prototype.updateSidebar = function(visibility) {
        if (visibility == null) {
          visibility = null;
        }
        if (visibility === null) {
          visibility = this.$("#contestOptionCheckbox").attr("checked") !== "checked";
        }
        if (visibility) {
          return $("body").removeClass("slide-away");
        } else {
          return $("body").addClass("slide-away");
        }
      };

      ContestNavigationView.prototype.toggleSidebar = function() {
        $(".page_navigation-sidebar").toggleClass("toggle-open");
        if ($(".page_navigation-sidebar.toggle-open").length > 0) {
          $("body").removeClass("sidebar-not-visible");
          return $("body").addClass("sidebar-visible");
        } else {
          $("body").removeClass("sidebar-visible");
          return $("body").addClass("sidebar-not-visible");
        }
      };

      ContestNavigationView.prototype.setContestSlug = function(contest_slug) {
        this.show();
        this.contest = HR.model('contest', {
          slug: contest_slug
        }).cached();
        this.listenToOnce(this.contest, 'reset', this.render);
        return this.render();
      };

      ContestNavigationView.prototype.hide = function() {
        $(".page_navigation-sidebar").removeClass("toggle-open");
        $("body").removeClass("slide-away");
        $("body").removeClass("sidebar-visible");
        $("body").removeClass("sidebar-not-visible");
        return $(this.el).hide();
      };

      ContestNavigationView.prototype.show = function() {
        return $(this.el).show();
      };

      ContestNavigationView.prototype.renderDropdown = function() {
        var contests, current_contest, data, that;
        if (!this.contest.sync_status) {
          return;
        }
        data = [];
        that = this;
        current_contest = {
          id: this.contest.get('id'),
          text: this.contest.get('name'),
          slug: this.contest.get('slug')
        };
        data.push(current_contest);
        contests = null;
        $(".hr_contest-list").select2({
          minimumInputLength: 1,
          data: data,
          query: function(query) {
            var getResult;
            if (!contests) {
              contests = HR.collection('public-contests');
              contests.cached();
            }
            data = {
              results: []
            };
            getResult = function() {
              _.each(contests.models, function(item) {
                if (item.get('name') && item.get('name').toUpperCase().indexOf(query.term.toUpperCase()) >= 0) {
                  return data.results.push({
                    id: item.get('id'),
                    text: item.get('name'),
                    slug: item.get('slug')
                  });
                }
              });
              return query.callback(data);
            };
            if (contests.sync_status) {
              return getResult();
            } else {
              return that.listenToOnce(contests, 'reset', function() {
                if (!contests.findWhere({
                  id: current_contest.id
                })) {
                  contests.add(new Backbone.Model(current_contest));
                }
                return getResult();
              });
            }
          }
        });
        $(".hr_contest-list").unbind("change").bind("change", (function(_this) {
          return function(e) {
            var contest_slug;
            contest_slug = e.added.slug;
            that.$(".hr_dynamic-challenges").attr("href", "/contests/" + contest_slug + "/challenges");
            that.$(".hr_dynamic-submissions").attr("href", "/contests/" + contest_slug + "/submissions");
            that.$(".hr_dynamic-leaderboard").attr("href", "/contests/" + contest_slug + "/leaderboard");
            return HR.router.navigate("/contests/" + contest_slug + "/challenges", true);
          };
        })(this));
        return $(".hr_contest-list").select2("data", current_contest);
      };

      ContestNavigationView.prototype.render = function() {
        var that;
        if (!this.contest.sync_status || this.contest.get('slug') === 'master') {
          return;
        }
        $(this.el).html(HR.appController.template(this.template, this, false)({
          contest_slug: this.contest.get('slug'),
          contest: this.contest
        }));
        this.countdownTimerView = new HR.CountdownTimerView({
          model: this.contest,
          template: 'dashboard/countdowntimer_v2'
        });
        this.add_subview(this.countdownTimerView);
        this.countdownTimerView.setElement($(this.el).find(".countdowntimer")).render();
        this.updateSidebar();
        that = this;
        $(".hr_sidebar-menu-link").unbind("click").bind('click', (function(_this) {
          return function(event) {
            return that.toggleSidebar();
          };
        })(this));
        this.renderDropdown();
        return this;
      };

      return ContestNavigationView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ContestNavigationView = ContestNavigationView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, SidebarView, _ref;
    SidebarView = (function(_super) {
      __extends(SidebarView, _super);

      function SidebarView() {
        return SidebarView.__super__.constructor.apply(this, arguments);
      }

      SidebarView.prototype.template = 'side-navigation';

      SidebarView.prototype.className = 'sidebar-view';

      SidebarView.prototype.initialize = function(options) {
        this.profile = HR.profile();
        this.listenTo(this.profile, 'sync', this.render);
        this.contest_indicator_class = "";
        this.contest_indicator_priority = 0;
        return $(window).scroll(this.handleScroll);
      };

      SidebarView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this, false)({
          profile: this.profile,
          contest_slug: HR.appController.get_current_contest_namespace()
        }));
        this.updateNotificationsCount();
        this.updateMessages();
        this.delegateEvents();
        this.initContestIndicator();
        this.handleScroll();
        return this;
      };

      SidebarView.prototype.handleScroll = function() {
        var pos;
        pos = Math.max($(window).scrollTop(), 0);
        if (pos >= 61) {
          return $("#sidebar").css("top", "0px");
        } else {
          return $("#sidebar").css("top", "" + (61 - pos) + "px");
        }
      };

      SidebarView.prototype.updateMessages = function() {
        var notifications_url, that;
        if (HR.development) {
          return;
        }
        that = this;
        if (!HR.profile() || !HR.profile().isLoggedIn()) {
          setTimeout(function() {
            return that.updateMessages.call(that);
          }, 5000);
          return;
        }
        notifications_url = "" + (this.profile.get('notifications_url')) + "-m";
        if (location.protocol === 'http:') {
          notifications_url = notifications_url.replace('https:', 'http:');
        }
        return $.ajax({
          url: notifications_url,
          success: function(data) {
            var thread_id;
            if (data) {
              thread_id = parseInt(data);
              that.update(thread_id);
              that.updateNotificationsCount();
              return that.updateMessages();
            } else {
              return that.updateMessages();
            }
          },
          error: function() {
            return setTimeout(function() {
              return that.updateMessages.call(that);
            }, 5000);
          }
        });
      };

      SidebarView.prototype.update = function(thread_id) {
        var collection, isMessageView, newCollection, newModel, view;
        if (HR.cachedMessagesCollection) {
          collection = HR.cachedMessagesCollection;
          newModel = new HR.MessageThreadModel();
          newModel.set('id', thread_id);
          newModel.fetch({
            success: function(model) {
              if (collection.findWhere({
                id: thread_id
              })) {
                return collection.findWhere({
                  id: thread_id
                }).set('unread_count', model.get('unread_count'));
              } else {
                return collection.add(model, {
                  at: 0
                });
              }
            }
          });
          view = HR.cachedMessageView || {};
          isMessageView = (HR.MessageThreadView !== void 0) && (HR.appView.contentView instanceof HR.MessageThreadView);
          if (!isMessageView) {
            view.messages_collection = {};
            view.messages_view = {};
            view.thread_id = null;
          }
          if (view.messages_collection[thread_id]) {
            newCollection = HR.collection('messages');
            newCollection.thread_id = thread_id;
            newCollection.setFrom(view.messages_collection[thread_id].first().get('id'));
            newCollection.fetch({
              success: function() {
                view.rearrangeThread(thread_id);
                view.threads_view[thread_id].model.set('last_message', newCollection.first().toJSON());
                return _.each(newCollection.models.reverse(), function(model) {
                  view.messages_collection[thread_id].add(model, {
                    at: 0
                  });
                  return view.messages_view[thread_id].appendElement(model);
                });
              }
            });
            if (thread_id === parseInt(view.thread_id)) {
              return view.readThread(thread_id);
            }
          } else {
            newCollection = HR.collection('messages');
            newCollection.thread_id = thread_id;
            return newCollection.fetch({
              success: function() {
                view.rearrangeThread(thread_id);
                return view.threads_view[thread_id].model.set('last_message', newCollection.first().toJSON());
              }
            });
          }
        }
      };

      SidebarView.prototype.updateNotificationsCount = function() {
        if (!HR.profile() || !HR.profile().isLoggedIn()) {
          return;
        }
        return $.ajax({
          url: "/rest/threads/unread_threads",
          success: function(resp) {
            if (resp.count) {
              return $(".hr_messages_count").html(resp.count);
            } else {
              return $(".hr_messages_count").html("");
            }
          }
        });
      };

      SidebarView.prototype.initContestIndicator = function() {
        var indicator_class, indicator_priority;
        indicator_priority = HR.PREFETCH_DATA.metadata.contest_status;
        indicator_class = '';
        if (indicator_priority === 2) {
          indicator_class = 'completed';
        } else if (indicator_priority === 3) {
          indicator_class = 'active';
        } else if (indicator_priority === 1) {
          indicator_class = 'pending';
        }
        return this.updateContestIndicator(indicator_class, indicator_priority);
      };

      SidebarView.prototype.updateContestIndicator = function(item_class, item_priority) {
        this.$(".hr_sidebar_contest_indicator").removeClass("status-indicator " + this.contest_indicator_class);
        if (item_priority > this.contest_indicator_priority) {
          this.contest_indicator_priority = item_priority;
          this.contest_indicator_class = item_class;
        }
        if (this.contest_indicator_priority) {
          return this.$(".hr_sidebar_contest_indicator").addClass("status-indicator " + this.contest_indicator_class);
        }
      };

      return SidebarView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.SidebarView = SidebarView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ContestsView, HR, _ref;
    ContestsView = (function(_super) {
      __extends(ContestsView, _super);

      function ContestsView() {
        return ContestsView.__super__.constructor.apply(this, arguments);
      }

      ContestsView.prototype.template = 'dashboard/contests';

      ContestsView.prototype.className = 'contests-view';

      ContestsView.prototype.initialize = function(options) {
        this.contest_slug = options.contest_slug;
        this.contest = options.contest;
        this.profile = options.profile;
        this.collection = options.collection;
        this.page = options.page;
        this.listenTo(this.collection, 'reset', this.render);
        if (this.contest) {
          this.listenTo(this.contest, 'reset', this.render);
        }
        this.has_template = false;
        this._template = false;
        this.listenTo(this, 'render', this.adjustChallengeListHeight);
        return this.listenTo(this.profile, 'sync', this.refreshCollection);
      };

      ContestsView.prototype.refreshCollection = function() {
        var that;
        that = this;
        return this.collection.fetch({
          success: function() {
            return that.render();
          }
        });
      };

      ContestsView.prototype.events = {
        "click .contest_signup": "showLogin",
        "click .contest-signup": "contestSignup",
        "click .contest-enter": "contestEnter",
        "click .contest-contest": "contestContest",
        "click div.contests-list-view a": "changeContest",
        "click div.down": "showNext",
        "click div.up": "showPrev"
      };

      ContestsView.prototype.changeContest = function(e) {
        e.preventDefault();
        this.page = 1;
        this.challenges = null;
        this.contest_slug = $(e.currentTarget).attr("href").split("/")[2];
        this.contest = new HR.ContestModel({
          slug: this.contest_slug
        });
        this.contest.cached();
        this.listenTo(this.contest, 'reset', this.render);
        HR.router.navigate($(e.currentTarget).attr("href"), false);
        this.render();
        return false;
      };

      ContestsView.prototype.setActive = function() {
        if (!this.collection.sync_status) {
          return;
        }
        if (this.contest_slug === "archived") {
          return;
        }
        if (this.contest_slug) {
          if (!(this.contest && this.contest.sync_status)) {
            return;
          }
        }
        if (!this.contest_slug) {
          _.each(this.collection.grouped()[0].contests.models, (function(_this) {
            return function(model) {
              if (model.get('slug') === "anki") {
                return _this.contest_slug = model.get('slug');
              }
            };
          })(this));
          if (!this.contest_slug && this.collection.grouped()[0].contests.length > 0) {
            this.contest_slug = this.collection.grouped()[0].contests.first().get('slug');
          }
          if (this.contest_slug) {
            this.contest = new HR.ContestModel({
              slug: this.contest_slug
            }).cached();
          }
        }
        _.each(this.collection.models, (function(_this) {
          return function(model) {
            if (model.get('slug') === _this.contest_slug) {
              return model.active = true;
            } else {
              return model.active = false;
            }
          };
        })(this));
        if (!this.challenges) {
          this.challenges = HR.collection('challenges');
          this.challenges.setContest(this.contest_slug);
          this.challenges.setPage(this.page);
          this.challenges.setLoginTracking(true);
          this.challenges.cached();
          this.listenTo(this.challenges, 'reset', this.render);
        }
        return true;
      };

      ContestsView.prototype.adjustChallengeListHeight = function() {
        var challengesList, minHeight;
        challengesList = this.$('div.challenges-list');
        minHeight = Math.max(this.$('.inline-sidebar').height() || 0, challengesList.height() || 0);
        if (minHeight > 0) {
          return challengesList.css('min-height', minHeight);
        }
      };

      ContestsView.prototype.render = function() {
        this.setActive();
        HR.appController.set_contest_namespace("master");
        if (!this.has_template) {
          HR.appController.getTemplate(this.template, function(template) {
            this._template = template;
            this.has_template = true;
            return this.renderView();
          }, this);
        } else {
          this.renderView();
        }
        this.trigger('render');
        return this;
      };

      ContestsView.prototype.renderView = function() {
        var background_image, button, challengesContainer, challenges_div, collection, contest_button, enter_button, message, signup_button;
        if (this.has_template) {
          $(this.el).html(this._template({
            contests: this.collection,
            profile: this.profile,
            contest: this.contest,
            contest_slug: this.contest_slug
          }));
          _.each(this.collection.grouped(), (function(_this) {
            return function(group) {
              var tabsContainer;
              tabsContainer = $();
              if (!_this.collection.sync_status && group.key === "archived") {
                return _this.$(".contests_list-" + group.key).html(HR.appController.viewLoader(32));
              } else {
                if (group.key === "archived" && _this.collection.page > 1) {
                  tabsContainer.push($("<div class='up m' data-offset='10'><div><a class='btn btn-text'><i class='icon-up-open-mini'></i>Load previous 10</a></div></div>").get(0));
                }
                _.each(group.contests.models, function(model, index) {
                  var _view;
                  _view = new HR.ContestsTabView({
                    model: model,
                    that: this
                  });
                  tabsContainer.push(_view.render().el);
                  return this.add_subview(_view);
                }, _this);
                if (group.key === "archived" && _this.collection.page * _this.collection.limit < _this.collection.total) {
                  tabsContainer.push($("<div class='down m' data-offset='10'><div><a class='btn btn-text'><i class='icon-down-open-mini'></i>Load next 10</a></div></div>").get(0));
                }
                return _this.$(".contests_list-" + group.key).html(tabsContainer);
              }
            };
          })(this));
          challenges_div = this.$('div.challenges-list');
          if (this.contest_slug === "archived") {
            collection = HR.collection("archived-contests", {
              page: this.page
            }).cached({
              cacheSiblings: true
            });
            this.archivedView = new HR.ArchivedContestsView({
              collection: collection
            });
            this.archivedView.setElement(this.$(".archived-contests")).render();
          }
          if (!(this.contest && this.contest.sync_status)) {
            return this;
          }
          if (this.contest.get('archived') || (this.contest.get('started') && this.contest.get('signed_up'))) {
            if (this.challenges && (this.challenges.sync_status || this.challenges.length > 0)) {
              challengesContainer = $();
              _.each(this.challenges.models, function(challenge) {
                var _view;
                _view = new HR.ChallengesListView({
                  contest: this.contest,
                  model: challenge,
                  id: parseInt(Math.random() * 1000000)
                });
                challengesContainer.push(_view.render().el);
                return this.add_subview(_view);
              }, this);
              challenges_div.html(challengesContainer);
              return HR.util.pagination(this.$('.pagination-wrapper'), this.challenges.getTotal(), "" + (this.challenges.pageURL()) + "/", this.challenges.getCurrentPage(), null, this.challenges.limit);
            } else {
              return challenges_div.html(HR.appController.viewLoader(64));
            }
          } else {
            signup_button = "<button class='btn btn-primary btn-large contests_pane-CTAbtn contest-signup'>Register</button>";
            enter_button = "<button class='btn btn-primary btn-large contests_pane-CTAbtn contest-enter'>Solve Challenges</button>";
            contest_button = "<button class='btn btn-primary btn-large contests_pane-CTAbtn contest-contest'>View Contest</button>";
            if (!this.contest.get('started') && this.contest.get('signed_up')) {
              message = "<p class='aside contests_pane-message'>You have registered for the contest.</p>";
              button = contest_button;
            } else if (this.contest.get('started') && !this.contest.get('signed_up')) {
              message = "<p class='aside contests_pane-message'>You have not registered for the contest. " + "The contest is in progress. Please register to start solving challenges.</p>";
              button = signup_button;
            } else if (!this.contest.get('started') && !this.contest.get('signed_up')) {
              message = "<p class='aside contests_pane-message'>You have not registered for the contest. " + "Please register to participate.</p>";
              button = signup_button;
            } else if (this.contest.get('started') && this.contest.get('signed_up')) {
              message = "<p class='aside contests_pane-message'>Contest has started.</p>";
              button = enter_button;
            }
            background_image = this.contest.get('homepage_background_image') || '/assets/hackergames/hacker-games-mountains.jpg';
            return challenges_div.html("<div class='text-center'>\n  <div class=\"contests_pane\">\n      <h3 class=\"alpha contests_pane-title\">" + (this.contest.get('name')) + "</h3>\n      <p>" + (this.contest.get('description')) + "</p>\n  </div>\n  " + message + "\n  " + button + "\n</div>");
          }
        }
      };

      ContestsView.prototype.contestSignup = function(e) {
        var current_text, that;
        e.preventDefault();
        if ($(e.currentTarget).attr("disabled") === "disabled") {
          return;
        }
        current_text = $(e.currentTarget).html();
        $(e.currentTarget).html("Signing up...");
        $(e.currentTarget).attr("disabled", "disabled");
        that = this;
        return $.ajax({
          type: "POST",
          beforeSend: function(xhr) {
            return xhr.setRequestHeader("X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content"));
          },
          url: "/rest/contests/" + this.contest_slug + "/signup",
          data: {
            contest_crp: $.cookie("" + this.contest_slug + "_crp")
          },
          success: (function(_this) {
            return function(data) {
              var profile;
              mixpanel.push([
                'track', "Contest Signup", {
                  contest: _this.contest_slug,
                  username: HR.profile().get('username')
                }
              ]);
              if (data.status) {
                that.contest.fetch({
                  success: function() {
                    return that.render();
                  }
                });
                return that.collection.fetch({
                  success: function() {
                    return that.render();
                  }
                });
              } else {
                profile = HR.profile();
                if (profile.isLoggedIn()) {
                  alert(data.message);
                } else {
                  (new HR.util.ShowLoginDialog({
                    show_sign_up_link: true,
                    error_message: data.message
                  })).render();
                }
                $(e.currentTarget).html(current_text);
                return $(e.currentTarget).removeAttr("disabled");
              }
            };
          })(this)
        });
      };

      ContestsView.prototype.contestEnter = function(e) {
        e.preventDefault();
        if ($(e.currentTarget).attr("disabled") === "disabled") {
          return;
        }
        $(e.currentTarget).html("Entering...");
        $(e.currentTarget).attr("disabled", "disabled");
        return HR.router.navigate("/contests/" + this.contest_slug + "/challenges", {
          trigger: true,
          replace: true
        });
      };

      ContestsView.prototype.contestContest = function(e) {
        e.preventDefault();
        if ($(e.currentTarget).attr("disabled") === "disabled") {
          return;
        }
        $(e.currentTarget).attr("disabled", "disabled");
        return window.location = "/" + this.contest_slug;
      };

      ContestsView.prototype.showLogin = function(e) {
        var element, login;
        e.preventDefault();
        element = $(e.target);
        login = HR.util.ShowLoginDialog({
          contest: element.attr("data-contest"),
          show_sign_up_link: true
        });
        return login.render();
      };

      ContestsView.prototype.showNext = function(e) {
        e.preventDefault();
        this.collection.contest_slug = null;
        this.collection.page += 1;
        this.collection.sync_status = false;
        this.collection.cached();
        return this.render();
      };

      ContestsView.prototype.showPrev = function(e) {
        e.preventDefault();
        this.collection.contest_slug = null;
        this.collection.page -= 1;
        this.collection.sync_status = false;
        this.collection.cached();
        return this.render();
      };

      return ContestsView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ContestsView = ContestsView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ArchivedContestsView, HR, _ref;
    ArchivedContestsView = (function(_super) {
      __extends(ArchivedContestsView, _super);

      function ArchivedContestsView() {
        return ArchivedContestsView.__super__.constructor.apply(this, arguments);
      }

      ArchivedContestsView.prototype.template = 'dashboard/archived-contests';

      ArchivedContestsView.prototype.className = 'archived-contests-view';

      ArchivedContestsView.prototype.initialize = function(options) {
        this.collection = options.collection;
        return this.listenTo(this.collection, 'reset', this.render);
      };

      ArchivedContestsView.prototype.render = function() {
        var count;
        if (!this.collection.sync_status) {
          return $(this.el).html(HR.appController.viewLoader(64));
        } else {
          $(this.el).html(HR.appController.template(this.template, this)({
            contests: this.collection
          }));
          return HR.util.pagination(this.$('.pagination-wrapper'), this.collection.total, "/contests/archived/", this.collection.page, null, count = this.collection.limit);
        }
      };

      return ArchivedContestsView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ArchivedContestsView = ArchivedContestsView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ContestsTabView, HR, _ref;
    ContestsTabView = (function(_super) {
      __extends(ContestsTabView, _super);

      function ContestsTabView() {
        return ContestsTabView.__super__.constructor.apply(this, arguments);
      }

      ContestsTabView.prototype.template = 'dashboard/contests-tab';

      ContestsTabView.prototype.className = 'contests-list-view';

      ContestsTabView.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        if (options.custom_template) {
          this.template = options.custom_template;
        }
        return this.listenTo(this.model, 'change', this.render);
      };

      ContestsTabView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this)({
          model: this.model
        }));
        $.timeago.settings.allowFuture = true;
        this.$('.timeago').timeago();
        this.delegateEvents();
        if (this.model.active) {
          this.model.unSetContestBroadcast();
          this.model.setContestBroadcast();
        }
        return this;
      };

      return ContestsTabView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ContestsTabView = ContestsTabView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var CountdownTimerView, HR, _ref;
    CountdownTimerView = (function(_super) {
      __extends(CountdownTimerView, _super);

      function CountdownTimerView() {
        return CountdownTimerView.__super__.constructor.apply(this, arguments);
      }

      CountdownTimerView.prototype.template = 'dashboard/countdowntimer';

      CountdownTimerView.prototype.className = 'countdowntimer-view';

      CountdownTimerView.prototype.initialize = function(options) {
        this.listenTo(this.model, 'reset', this.render);
        this.listenTo(this.model, 'change', this.render);
        if (options.template) {
          return this.template = options.template;
        }
      };

      CountdownTimerView.prototype.setContest = function(model) {
        this.stopListening(this.model);
        this.model = model;
        this.listenTo(this.model, 'reset', this.render);
        this.listenTo(this.model, 'change', this.render);
        return this.render();
      };

      CountdownTimerView.prototype.render = function() {
        var milestone_epoch, _clbk;
        if (!(this.model.get('epoch_starttime') || this.model.get('epoch_endttime'))) {
          this.$el.hide();
          return this;
        }
        $(this.el).html(HR.appController.template(this.template, this, false)({
          model: this.model
        }));
        this.$el.show();
        if (this.model.ended()) {
          milestone_epoch = null;
        } else if (this.model.started()) {
          milestone_epoch = this.model.get('epoch_endtime');
        } else {
          milestone_epoch = this.model.get('epoch_starttime');
        }
        if (this.countdown_interval) {
          clearInterval(this.countdown_interval);
        }
        if (this.model.get("kind") === "acm") {
          _clbk = (function(_this) {
            return function() {
              _this.$('.countdown').html(HR.util.getRemainingTime(milestone_epoch));
              return _this.$('.contest-countdown').css("border-bottom", "0px");
            };
          })(this);
          _clbk();
          this.countdown_interval = setInterval(_clbk, 1000);
        } else {
          this.$('.countdown').html($.timeago(new Date(0).setUTCSeconds(milestone_epoch)));
          this.$('.contest-countdown').css("border-bottom", "1px black dotted");
          if (!(milestone_epoch === null || milestone_epoch === 0)) {
            _clbk = function() {
              return HR.util.getRemainingTime(milestone_epoch);
            };
            this.$('.countdown').tooltip({
              "title": _clbk
            });
          }
        }
        return this;
      };

      return CountdownTimerView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.CountdownTimerView = CountdownTimerView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, ViewShiv, _ref;
    ViewShiv = (function(_super) {
      __extends(ViewShiv, _super);

      function ViewShiv() {
        return ViewShiv.__super__.constructor.apply(this, arguments);
      }

      ViewShiv.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        ViewShiv.__super__.initialize.call(this, options);
        this.template = options.view;
        this.setElement(options.el);
        if (options.model) {
          this.model.bind("change", this.render, this);
          return this.model.bind("reset", this.render, this);
        }
      };

      ViewShiv.prototype.render = function() {
        HR.appController.getTemplate(this.template, (function(_this) {
          return function(template) {
            return _this.$el.html(template({
              model: _this.model.toJSON()
            }));
          };
        })(this), this);
        return this;
      };

      return ViewShiv;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ViewShiv = ViewShiv;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var BreadCrumbsView, HR, _ref;
    BreadCrumbsView = (function(_super) {
      __extends(BreadCrumbsView, _super);

      function BreadCrumbsView() {
        return BreadCrumbsView.__super__.constructor.apply(this, arguments);
      }

      BreadCrumbsView.prototype.template = 'dashboard/bread-crumbs';

      BreadCrumbsView.prototype.className = 'breadcrumbs-view';

      BreadCrumbsView.prototype.initialize = function(options) {
        return this.listenTo(this.collection, 'add change', this.render);
      };

      BreadCrumbsView.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this)({
          collection: this.collection
        }));
        return this;
      };

      return BreadCrumbsView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.BreadCrumbsView = BreadCrumbsView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, Modal, _ref;
    Modal = (function(_super) {
      __extends(Modal, _super);

      function Modal() {
        return Modal.__super__.constructor.apply(this, arguments);
      }

      Modal.prototype.template = "modal2";

      Modal.prototype.className = "modal-view";

      Modal.prototype.defaults = {
        header: "Header",
        body: "Body",
        footer: "Footer"
      };

      Modal.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        Modal.__super__.initialize.call(this, options);
        if (options.parent) {
          this.parent = options.parent;
        }
        if ($('body').find('#modal-wrap').length === 0) {
          $('body').append('<div id="modal-wrap"></div>');
        }
        $('#modal-wrap').append("<div id='modal-" + this.cid + "'></div>");
        return this.el = $("body #modal-wrap #modal-" + this.cid);
      };

      Modal.prototype.render = function() {
        HR.appController.getTemplate(this.template, (function(_this) {
          return function(t) {
            $(_this.el).html(t({
              body: _this.body,
              header: _this.header,
              footer: _this.footer,
              template: _this.template
            }));
            $(_this.el).find('.modal').modal(true).show();
            _this.$el = $(_this.el);
            _this.trigger('doneRendering');
            return _this.delegateEvents();
          };
        })(this));
        return this;
      };

      Modal.prototype.remove = function() {
        $(this.el).modal('hide');
        return Modal.__super__.remove.apply(this, arguments);
      };

      return Modal;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.Modal = Modal;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, MultiFrameModal, _ref;
    MultiFrameModal = (function(_super) {
      __extends(MultiFrameModal, _super);

      function MultiFrameModal() {
        return MultiFrameModal.__super__.constructor.apply(this, arguments);
      }

      MultiFrameModal.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        MultiFrameModal.__super__.initialize.call(this, options);
        this.currentFrame = 0;
        this.framesTemplate = options.frames;
        this.framesData = options.data || {};
        return this.hasTemplate = false;
      };

      MultiFrameModal.prototype.events = {
        'click .js_next-frame': 'nextFrame',
        'click .js_prev-frame': 'prevFrame',
        'click label.onboarding_trackSelect': 'trackSel',
        'click .btn-facebook': 'facebookLogin',
        'click .close': 'stopTour'
      };

      MultiFrameModal.prototype.stopTour = function(e) {
        if (this.currentFrame !== 2) {
          return HR.tour_going = false;
        }
      };

      MultiFrameModal.prototype.trackSel = function(gg) {
        var keyx;
        keyx = $(gg.currentTarget).find('input').val();
        if (keyx !== "") {
          $('.onboarding_trackSelect').removeClass('active');
          $(gg.currentTarget).addClass('active');
        }
        return this;
      };

      MultiFrameModal.prototype.prevFrame = function() {
        this.trigger('preFrameChange', this.currentFrame, this.currentFrame - 1);
        this.currentFrame = this.currentFrame - 1;
        this.renderFrameChange();
        this.trigger('postFrameChange', this.currentFrame + 1, this.currentFrame);
        return this.log("@trigger('postFrameChange', " + this.currentFrame + ", " + (this.currentFrame + 1) + ")");
      };

      MultiFrameModal.prototype.nextFrame = function() {
        this.trigger('preFrameChange', this.currentFrame, this.currentFrame + 1);
        this.currentFrame = this.currentFrame + 1;
        this.renderFrameChange();
        this.trigger('postFrameChange', this.currentFrame - 1, this.currentFrame);
        return this.log("@trigger('postFrameChange', " + this.currentFrame + ", " + (this.currentFrame - 1) + ")");
      };

      MultiFrameModal.prototype.renderFrameChange = function() {
        if (!this.frames[this.currentFrame]) {
          this.$(".close").click();
          return;
        }
        this.$(".modal-header .header-msg").html(this.frames[this.currentFrame].header);
        this.$(".modal-body").html(this.frames[this.currentFrame].body);
        this.$(".modal-footer").html(this.frames[this.currentFrame].footer);
        this.delegateEvents();
        return this;
      };

      MultiFrameModal.prototype.facebookLogin = function(e) {
        return HR.appController.facebook_login(e, this.render);
      };

      MultiFrameModal.prototype.render = function() {
        if (!this.hasTemplate) {
          HR.appController.getTemplate(this.framesTemplate, (function(_this) {
            return function(frames) {
              _this.hasTemplate = true;
              _this._template = frames;
              _this.renderView();
              MultiFrameModal.__super__.render.apply(_this, arguments);
              return _this.delegateEvents();
            };
          })(this));
        } else {
          this.renderView();
        }
        return this;
      };

      MultiFrameModal.prototype.renderView = function() {
        var fdata, frame;
        fdata = document.createElement('div');
        this.framesData.profile = HR.profile().toJSON();
        $(fdata).append(this._template(this.framesData));
        $(fdata).children('section');
        this.frames = _.map($(fdata).children('section'), function(frame) {
          return {
            header: $(frame).children('header').html(),
            body: $(frame).children('article').html(),
            footer: $(frame).children('footer').html()
          };
        });
        frame = this.frames[this.currentFrame];
        this.body = frame.body;
        this.header = frame.header;
        return this.footer = frame.footer;
      };

      return MultiFrameModal;

    })(window.HR.Modal);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.MultiFrameModal = MultiFrameModal;
  });

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ChallengesView, HR, _ref;
    ChallengesView = (function(_super) {
      __extends(ChallengesView, _super);

      function ChallengesView() {
        this.renderTagInput = __bind(this.renderTagInput, this);
        return ChallengesView.__super__.constructor.apply(this, arguments);
      }

      ChallengesView.prototype.template = 'dashboard/challenges-master';

      ChallengesView.prototype.className = 'challenges-view';

      ChallengesView.prototype.rendered = false;

      ChallengesView.prototype.initialize = function(options) {
        this.profile = HR.profile();
        this.profile.fetchScores();
        if (options.filter) {
          this.filter = options.filter;
        }
        this.contest = options.contest;
        this.current_track_slug = options.current_track_slug;
        this.current_chapter_slug = options.current_chapter_slug;
        this.challenges = options.challenges;
        this.profile = HR.profile();
        this.getRecommendedChallenge();
        this.listenTo(this.profile, 'reset', this.loggedIn);
        this.listenTo(this.profile, 'reset', this.renderScore);
        this.listenTo(this.challenges, 'reset', this.render);
        this.listenTo(this.challenges, 'change', this.render);
        return this.getRecentHackers();
      };

      ChallengesView.prototype.events = {
        "click #clear-filters": "clearFilters",
        "click #submit-filters": "submitFilters",
        "click #filters-toggle": "toggleFilterWidget",
        "click .chapter-item": "changeChapter",
        "change .filter-checkbox input": "toggleFilter",
        "change input[type=hidden]": "setFilters",
        "click .close": "toggleFilterWidget",
        "click .hacker-wrap": "sendMessage"
      };

      ChallengesView.prototype.destroy = function() {
        if (HR.tourbus) {
          HR.tourbus.destroy();
          $(".ob-overlay").hide();
        }
        return ChallengesView.__super__.destroy.apply(this, arguments);
      };

      ChallengesView.prototype.sendMessage = function(e) {
        var dialog;
        e.preventDefault();
        if (this.profile.isLoggedIn()) {
          dialog = new HR.util.ShowMessageDialog({
            username: $(e.currentTarget).attr("data-username")
          });
          return dialog.render();
        }
      };

      ChallengesView.prototype.submitFilters = function(e) {
        var baseURL;
        e.preventDefault();
        baseURL = "" + (this.challenges.pageURL()) + "/challenges";
        if (this.challenges.filters.length > 0) {
          baseURL += "/filter/" + this.challenges.filters.join("+");
        }
        if (this.challenges.sort_by) {
          baseURL += "/sort/" + this.challenges.sort_by;
          if (this.challenges.sort_dir !== "desc") {
            baseURL += "/dir/desc";
          }
        }
        baseURL += "/page/" + (this.challenges.getCurrentPage());
        if (baseURL !== document.location.pathname) {
          this.$("#tag-list").select2("destroy");
          return HR.router.navigate(baseURL, {
            trigger: true
          });
        }
      };

      ChallengesView.prototype.clearFilters = function(e) {
        var url;
        e.preventDefault();
        url = "" + (this.challenges.pageURL()) + "/challenges";
        if (url !== document.location.pathname) {
          this.$("#tag-list").select2("destroy");
          return HR.router.navigate(url, {
            trigger: true
          });
        }
      };

      ChallengesView.prototype.setFilters = function(e) {
        var filters;
        filters = [];
        $.each(this.$('input[type=checkbox]'), function(index, elem) {
          if ($(elem).is(":checked")) {
            return filters.push($(elem).val());
          }
        });
        if (this.$("#tag-list").val()) {
          filters.push.apply(filters, this.$("#tag-list").val().split("+"));
        }
        return this.challenges.setFilters(filters);
      };

      ChallengesView.prototype.toggleFilter = function(e) {
        var ex, target;
        ex = $(e.target.parentElement);
        ex.toggleClass('active');
        ex.find('i').toggleClass('filter');
        target = $(e.target);
        this.setFilters();
        return this;
      };

      ChallengesView.prototype.toggleFilterWidget = function(e) {
        this.$("#challenges-filters").slideToggle();
        this.$("#filters-toggle").toggleClass("active");
        if (this.$("#filters-toggle").hasClass("active")) {
          this.$("#filters-toggle").html("Hide Filters&nbsp;&nbsp;<i class='icon-up-open-mini'></i>");
        } else {
          this.$("#filters-toggle").html("Show Filters&nbsp;&nbsp;<i class='icon-down-open-mini'></i>");
        }
        return this;
      };

      ChallengesView.prototype.renderTagInput = function() {
        var that;
        that = this;
        $(this.el).find('#tag-list').select2({
          multiple: true,
          minimumInputLength: 1,
          allowClear: true,
          width: "600px",
          placeholder: "Add a tag...",
          separator: "+",
          ajax: {
            url: "/rest/tags/autocomplete",
            dataType: "json",
            data: function(term, page) {
              return {
                q: term
              };
            },
            results: function(data, page) {
              var elem;
              data = (function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = data.length; _i < _len; _i++) {
                  elem = data[_i];
                  _results.push({
                    id: elem.slug,
                    text: elem.name
                  });
                }
                return _results;
              })();
              return {
                results: data
              };
            }
          },
          initSelection: function(element, callback) {
            var tags;
            tags = that.filter.split("+");
            $.each(["complete", "incomplete", "sponsored"], function(index, elem) {
              var elemindex;
              elemindex = $.inArray(elem, tags);
              if (elemindex >= 0) {
                return tags.splice(elemindex, 1);
              }
            });
            if (tags.length > 0) {
              tags = tags.join("+");
              return $.ajax("/rest/tags/" + tags).done(function(data) {
                var elem;
                data = (function() {
                  var _i, _len, _ref, _results;
                  _ref = data.model;
                  _results = [];
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    elem = _ref[_i];
                    _results.push({
                      id: elem.slug,
                      text: elem.name
                    });
                  }
                  return _results;
                })();
                return callback(data);
              });
            }
          }
        });
        return this;
      };

      ChallengesView.prototype.activeTag = function() {
        if (this.category_slugs && this.category_slugs[1]) {
          return this.category_slugs[1];
        } else {
          return "";
        }
      };

      ChallengesView.prototype.categories = function() {
        if (!this.contest.get('has_tracks')) {
          return [];
        }
        return this.contest.tracks();
      };

      ChallengesView.prototype.adjustChallengeListHeight = function() {
        var challengesList, minHeight;
        challengesList = this.$('div.challenges-list');
        minHeight = Math.max(this.$('.inline-sidebar').height() || 0, challengesList.height() || 0);
        if (minHeight > 0) {
          return challengesList.css('min-height', minHeight);
        }
      };

      ChallengesView.prototype.getSortLink = function(sort_field) {
        var baseURL;
        baseURL = "" + (this.challenges.pageURL()) + "/challenges";
        if (this.challenges.filters.length > 0) {
          baseURL += "/filter/" + this.challenges.filters.join("+");
        }
        baseURL += "/sort/" + sort_field;
        if (this.challenges.sort_by === sort_field && this.challenges.sort_dir !== "desc") {
          baseURL += "/dir/desc";
        }
        baseURL += "/page/" + (this.challenges.getCurrentPage());
        return baseURL;
      };

      ChallengesView.prototype.getRecommendedChallenge = function() {
        if (!HR.profile().isLoggedIn()) {
          return;
        }
        this.recommended_challenge = new HR.RecommendedChallengeModel({
          tag: this.activeCategory,
          type: (HR.profile().isLoggedIn() ? "" : "easiest")
        });
        this.listenTo(this.recommended_challenge, "reset", this.render);
        this.recommended_challenge.cached();
        return this.render();
      };

      ChallengesView.prototype.loggedIn = function() {
        var that, tracks_collection;
        HR.PREFETCH_DATA.profile = HR.profile().toJSON();
        that = this;
        tracks_collection = new HR.TrackCollection;
        return tracks_collection.fetch({
          success: function() {
            _.each(tracks_collection.models, function(model) {
              return HR.PREFETCH_DATA.tracks[model.get('slug')] = model.toJSON();
            });
            return that.getRecommendedChallenge();
          }
        });
      };

      ChallengesView.prototype.getRecentHackers = function() {
        var that;
        if (this.contest.get('slug') === 'master') {
          return;
        }
        that = this;
        return $.ajax({
          url: "" + (this.contest.restURL()) + "/recent_hackers",
          success: function(data) {
            that.recent_hackers = data;
            return that.render();
          }
        });
      };

      ChallengesView.prototype.navigate = function() {
        $.cookie("hr_categories-" + (this.contest.get('slug')), _.compact([this.current_track_slug, this.current_chapter_slug]), {
          path: '/'
        });
        this.challenges.setCategories([this.current_track_slug, this.current_chapter_slug]);
        this.challenges.total = null;
        this.challenges.page = 1;
        this.challenges.sync_status = false;
        HR.router.navigate(this.challenges.pageURL() + ("/challenges/page/" + this.challenges.page), false);
        this.challenges.cached();
        return this.render();
      };

      ChallengesView.prototype.changeChapter = function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.current_chapter_slug = $(e.currentTarget).attr('data-chapter');
        return this.navigate();
      };

      ChallengesView.prototype.renderOnboarding = function() {
        var func;
        if (!HR.tour_going) {
          return;
        }
        func = function() {
          if (this.$("#onboarding-tour").length > 0 && this.$("#ob-challenge").length > 0 && this.$(".ob-overlay").length > 0) {
            this.$(".ob-overlay").click(function() {
              HR.tour_going = false;
              if (HR.tourbus) {
                $(".ob-overlay").hide();
                HR.tourbus.destroy();
                return HR.tourbus = void 0;
              }
            });
            if (!HR.tourbus) {
              HR.tourbus = $.tourbus('#onboarding-tour', {
                onStop: function() {
                  return $("#ob-challenge").click();
                },
                onLegStart: function(leg, bus) {
                  if (leg.rawData.highlight) {
                    return $(".ob-overlay").show();
                  }
                },
                onLegEnd: function(leg, bus) {
                  $(".ob-overlay").hide();
                  return HR.advance_onboarding();
                }
              });
            }
            HR.tourbus.depart();
            return true;
          } else {
            return false;
          }
        };
        if (!func()) {
          return setTimeout(this.renderOnboarding, 500);
        }
      };

      ChallengesView.prototype.render = function() {
        var challengesContainer, index, listView, select2filters, tags, url;
        if (HR.profile().isLoggedIn() && !HR.PREFETCH_DATA.profile.id) {
          this.loggedIn();
        }
        if (this.filter) {
          tags = this.filter.split("+");
          $.each(["complete", "incomplete", "sponsored"], function(index, elem) {
            var elemindex;
            elemindex = $.inArray(elem, tags);
            if (elemindex >= 0) {
              return tags.splice(elemindex, 1);
            }
          });
          select2filters = tags.join("+");
        } else {
          select2filters = "";
        }
        if (this.activeCategory === void 0) {
          this.activeCategory = "shortcuts";
        }
        if (this.contest.get('slug') === 'master') {
          this.template = 'dashboard/challenges-master';
        } else {
          this.template = 'dashboard/challenges-contest';
        }
        $(this.el).html(HR.appController.template(this.template, this)({
          categories: this.categories(),
          current_track: this.current_track_slug,
          current_chapter: this.current_chapter_slug,
          profile: this.profile.toJSON(),
          contest: this.contest.toJSON(),
          remaining_time: this.contest.getRemainingTime(),
          recommended_challenge: this.recommended_challenge,
          filter: this.filter,
          filters: this.challenges.filters,
          select2filters: select2filters,
          activeTag: this.activeTag(),
          recent_hackers: this.recent_hackers
        }));
        $(this.el).find(".sort-title > a").attr("href", this.getSortLink("name"));
        $(this.el).find(".sort-date > a").attr("href", this.getSortLink("created_at"));
        if (this.challenges.sort_by === "name") {
          if (this.challenges.sort_dir === "desc") {
            $(this.el).find(".sort-title").find("i.icon-down-dir").addClass('active');
          } else {
            $(this.el).find(".sort-title").find("i.icon-up-dir").addClass('active');
          }
        } else if (this.challenges.sort_by === "created_at") {
          if (this.challenges.sort_dir === "desc") {
            $(this.el).find(".sort-date").find("i.icon-down-dir").addClass('active');
          } else {
            $(this.el).find(".sort-date").find("i.icon-up-dir").addClass('active');
          }
        }
        if (this.activeTag() === "all") {
          listView = HR.ChallengesSortedListView;
        } else {
          listView = HR.ChallengesListView;
        }
        if (this.challenges.sync_status) {
          challengesContainer = $();
          this._subviews = [];
          if (this.challenges.models.length > 0) {
            index = 0;
            _.each(this.challenges.models, function(challenge) {
              var _view;
              index += 1;
              _view = new listView({
                model: challenge,
                id: parseInt(Math.random() * 1000000),
                contest: this.contest,
                is_ob_challenge: index === 1
              });
              challengesContainer.push(_view.render().el);
              return this.add_subview(_view);
            }, this);
          } else {
            if ($.inArray("recommended", this.category_slugs) >= 0) {
              challengesContainer = $("<p class='aside padding'>We're currently collecting data and will be rolling out recommended challenges for you soon!</p>");
            } else {
              challengesContainer = $("<p class='aside padding'>No matching challenges found.</p>");
            }
          }
          this.$('div.challenges-list').append(challengesContainer);
          url = "" + (this.challenges.pageURL()) + "/challenges";
          if (this.challenges.filters.length > 0) {
            url += "/filter/" + this.challenges.filters.join("+");
          }
          if (this.challenges.sort_by) {
            url += "/sort/" + this.challenges.sort_by;
          }
          if (this.challenges.sort_dir) {
            url += "/dir/" + this.challenges.sort_dir;
          }
          HR.util.pagination(this.$('.pagination-wrapper'), this.challenges.getTotal(), "" + url + "/page/", this.challenges.getCurrentPage(), null, this.challenges.limit);
          if (this.challenges.models.length <= 0) {
            this.$('.pagination-wrapper').hide();
          }
        } else {
          $(this.el).find('div.challenges-list').html(HR.appController.viewLoader(64));
        }
        if (!$(this.el).find("#tag-list")) {
          setTimeout(this.renderTagInput(), 500);
        } else {
          this.renderTagInput();
        }
        this.trigger('render');
        this.renderOnboarding();
        return this;
      };

      return ChallengesView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ChallengesView = ChallengesView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ChallengesSortedListView, HR, _ref;
    ChallengesSortedListView = (function(_super) {
      __extends(ChallengesSortedListView, _super);

      function ChallengesSortedListView() {
        return ChallengesSortedListView.__super__.constructor.apply(this, arguments);
      }

      ChallengesSortedListView.prototype.initialize = function(options) {
        var that;
        this.contest = options.contest;
        this.id = options.id;
        this.elapsed_time = 0;
        return that = this;
      };

      ChallengesSortedListView.prototype.template = 'dashboard/challenges-sorted-list';

      ChallengesSortedListView.prototype.className = 'challenges-list-view';

      ChallengesSortedListView.prototype.baseURL = function() {
        return this.model.pageURL();
      };

      ChallengesSortedListView.prototype.render = function() {
        var that, width_percent, _model;
        that = this;
        _model = this.model.toJSON();
        if (_model) {
          $(this.el).html(HR.appController.template(this.template, this)({
            model: _model,
            id: this.id,
            extraHackersLimit: 10,
            baseURL: this.baseURL(),
            contest: this.contest ? this.contest.toJSON() : null
          }));
          width_percent = (100.0 * _model.solved_count) / _model.total_count;
          if (width_percent) {
            this.$(".progress .bar").css({
              width: "" + width_percent + "%"
            });
          } else {
            this.$(".progress").hide();
          }
          this.delegateEvents();
          if (!_model.has_started || !_model.has_ended) {
            if (this.interval) {
              clearInterval(this.interval);
            }
            this.interval = setInterval(function() {
              return that.update_time();
            }, 1000);
          }
        }
        return this;
      };

      ChallengesSortedListView.prototype.update_time = function() {
        var html_content;
        this.elapsed_time = this.elapsed_time + 1;
        html_content = this.time_to_html(this.model.attributes.countdown_time - this.elapsed_time);
        this.$("#js-challenge-starttime-countdown-" + this.id).html(html_content).parent().show();
        if (!$("#js-challenge-starttime-countdown-" + this.id).html()) {
          return clearInterval(this.interval);
        }
      };

      ChallengesSortedListView.prototype.time_to_html = function(time) {
        var days, hours, minutes, seconds;
        time = parseInt(time);
        seconds = time % 60;
        time /= 60;
        time = parseInt(time);
        minutes = time % 60;
        time /= 60;
        time = parseInt(time);
        hours = time % 24;
        time /= 24;
        time = parseInt(time);
        days = time;
        if (days > 0) {
          return "" + days + " days, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds";
        } else if (hours > 0) {
          return "" + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds";
        } else if (minutes > 0) {
          return "" + minutes + " minutes and " + seconds + " seconds";
        } else if (seconds > 0) {
          return "" + seconds + " seconds";
        } else {
          this.model.attributes.has_started = true;
          clearInterval(this.interval);
          this.render();
          return "0 seconds";
        }
      };

      return ChallengesSortedListView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ChallengesSortedListView = ChallengesSortedListView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ChallengesListView, HR, _ref;
    ChallengesListView = (function(_super) {
      __extends(ChallengesListView, _super);

      function ChallengesListView() {
        return ChallengesListView.__super__.constructor.apply(this, arguments);
      }

      ChallengesListView.prototype.initialize = function(options) {
        var that;
        this.contest = options.contest;
        this.id = options.id;
        this.elapsed_time = 0;
        this.is_ob_challenge = options.is_ob_challenge;
        return that = this;
      };

      ChallengesListView.prototype.template = 'dashboard/challenges-list';

      ChallengesListView.prototype.className = 'challenges-list-view';

      ChallengesListView.prototype.events = {
        'click a': 'triggerLinkClick'
      };

      ChallengesListView.prototype.triggerLinkClick = function(e) {
        return this.trigger('linkClicked', e.target);
      };

      ChallengesListView.prototype.baseURL = function() {
        return this.model.pageURL();
      };

      ChallengesListView.prototype.render = function() {
        var that, width_percent, _model;
        that = this;
        _model = this.model.toJSON();
        if (_model) {
          $(this.el).html(HR.appController.template(this.template, this)({
            model: _model,
            id: this.id,
            extraHackersLimit: 10,
            baseURL: this.baseURL(),
            contest: this.contest ? this.contest.toJSON() : null,
            throbber: HR.appController.viewLoader()
          }));
          if (_model.total_count && _model.solved_count) {
            width_percent = (100.0 * _model.solved_count) / _model.total_count;
          } else {
            width_percent = null;
          }
          if (width_percent) {
            this.$(".progress .bar").css({
              width: "" + width_percent + "%"
            });
          } else {
            this.$(".progress").hide();
          }
          this.countdownTimerView = new HR.CountdownTimerView({
            model: this.model,
            template: 'dashboard/countdowntimer_v2'
          });
          this.add_subview(this.countdownTimerView);
          this.countdownTimerView.setElement(this.$(".countdowntimer")).render();
          this.delegateEvents();
          if (!_model.has_started || !_model.has_ended) {
            if (this._interval) {
              clearInterval(this._interval);
            }
            this._interval = setInterval((function(_this) {
              return function() {
                return _this.update_time();
              };
            })(this), 1000);
          }
        }
        if (this.is_ob_challenge) {
          this.$(".start").attr("id", "ob-challenge");
        }
        return this;
      };

      ChallengesListView.prototype.update_time = function() {
        var html_content;
        this.elapsed_time = this.elapsed_time + 1;
        html_content = this.time_to_html(this.model.attributes.countdown_time - this.elapsed_time);
        this.$("#js-challenge-starttime-countdown-" + this.id).html(html_content).parent().show();
        this.$(".js-start_timer").html(html_content);
        if (!this.$("#js-challenge-starttime-countdown-" + this.id).html() && !this.$(".js-start_timer").html()) {
          return clearInterval(this._interval);
        }
      };

      ChallengesListView.prototype.time_to_html = function(time) {
        var days, hours, minutes, seconds;
        time = parseInt(time);
        seconds = time % 60;
        time /= 60;
        time = parseInt(time);
        minutes = time % 60;
        time /= 60;
        time = parseInt(time);
        hours = time % 24;
        time /= 24;
        time = parseInt(time);
        days = time;
        if (days > 0) {
          return "" + days + " days, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds";
        } else if (hours > 0) {
          return "" + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds";
        } else if (minutes > 0) {
          return "" + minutes + " minutes and " + seconds + " seconds";
        } else if (seconds > 0) {
          return "" + seconds + " seconds";
        } else {
          if (!this.model.attributes.has_started) {
            setTimeout((function(_this) {
              return function() {
                _this.model.disableThrobber = true;
                return _this.model.fetch({
                  success: function() {
                    return _this.render();
                  }
                });
              };
            })(this), 1500);
          }
          this.model.attributes.has_started = true;
          clearInterval(this._interval);
          this.render();
          return "0 seconds";
        }
      };

      return ChallengesListView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ChallengesListView = ChallengesListView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, OnboardingChallengesListView, _ref;
    OnboardingChallengesListView = (function(_super) {
      __extends(OnboardingChallengesListView, _super);

      function OnboardingChallengesListView() {
        return OnboardingChallengesListView.__super__.constructor.apply(this, arguments);
      }

      OnboardingChallengesListView.prototype.template = 'onboarding-challenges-list';

      OnboardingChallengesListView.prototype.events = {
        'click a': 'triggerLinkClick'
      };

      OnboardingChallengesListView.prototype.triggerLinkClick = function(e) {
        return this.trigger('linkClicked', e.target);
      };

      return OnboardingChallengesListView;

    })(window.HR.ChallengesListView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.OnboardingChallengesListView = OnboardingChallengesListView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, OnboardingView, _ref;
    OnboardingView = (function(_super) {
      __extends(OnboardingView, _super);

      function OnboardingView() {
        return OnboardingView.__super__.constructor.apply(this, arguments);
      }

      OnboardingView.prototype.templates = ["onboarding_social"];

      OnboardingView.prototype["class"] = 'onboarding-view';

      OnboardingView.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.currentFrame = 0;
        this.profile = HR.profile();
        this.school = this.profile.get('school');
        this.company = this.profile.get('company');
        return this.email_preferences_model = HR.model("email-preferences", {
          username: this.profile.get('username')
        }).cached();
      };

      OnboardingView.prototype.render = function() {
        var data, that, track_url_map;
        that = this;
        data = {
          recommended_track: {}
        };
        track_url_map = {
          algorithms: "/categories/algorithms/warmup",
          ai: "/categories/ai/introduction",
          misc: "/categories/miscellaneous/normal-languages",
          fp: "/categories/fp/intro"
        };
        this.tour = new HR.MultiFrameModal({
          frames: ['onboarding-social'],
          data: data
        });
        this.tour.on("preFrameChange", function(frame_from, frame_to) {
          if (frame_to === 2) {
            return HR.tour_going = true;
          }
        });
        this.tour.on("postFrameChange", function(frame_from, frame_to) {
          HR.advance_onboarding();
          if (frame_to === 2) {
            if ($('#email-preference').is(':checked')) {
              that.email_preferences_model.set('upcoming_contest', true);
              that.email_preferences_model.save();
              mixpanel.push([
                'track', "SetUpcomingEmailPref", {
                  'value': 'true'
                }
              ]);
            }
            return HR.router.navigate(track_url_map[$("input[type='radio'][name='favorite']:checked").val()] + "?action=onboarding", true, true);
          }
        });
        this.tour.on("doneRendering", function() {
          $(".js-fake-next").bind("click", $.proxy(that.loadNetwork, that));
          $(".btn-facebook").bind("click", HR.appController.facebook_login);
          $("#onboarding_school").select2(HR.util.school_select2_options);
          $("#onboarding_company").completer('company', {
            onselect: function(value) {
              return that.company = value;
            }
          });
          if (that.school) {
            $(this.el).find("#onboarding_school").val(that.school);
            $(this.el).find("#s2id_onboarding_school .select2-choice span").text(that.school);
          }
          $("#onboarding_school").on("change", function(e) {
            return that.school = e.val;
          });
          return $("#onboarding_company").keyup(function(e) {
            return that.company = $(e.currentTarget).val();
          });
        });
        this.tour.render();
        HR.advance_onboarding = function() {
          HR.tour_step += 1;
          return mixpanel.push([
            'track', 'Onboarding Steps', {
              'Step': HR.tour_step
            }
          ]);
        };
        HR.tour_step = 0;
        HR.advance_onboarding();
        this.delegateEvents();
        return this;
      };

      OnboardingView.prototype.loadNetwork = function(e) {
        var that;
        $(e.currentTarget).attr("disabled", "disabled");
        $(".modal-body .onboarding_modal").html("<div class='left'> <p>We are generating your network with the information you provided. It will take only few seconds.</p> " + (HR.appController.viewLoader(64)) + " </div>");
        that = this;
        return $.ajax({
          url: "/rest/hackers/me/update_social_network",
          data: {
            school: this.school,
            company: this.company
          },
          type: 'PUT',
          success: function(data) {
            that.tour.framesData.recommended_track = data.track;
            that.tour.render();
            return $(".js_next-frame").click();
          }
        });
      };

      OnboardingView.prototype.facebookLogin = function(e) {
        return HR.appController.facebook_login(e);
      };

      return OnboardingView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.OnboardingView = OnboardingView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var CodeCompileTestView, HR;
    CodeCompileTestView = (function(_super) {
      __extends(CodeCompileTestView, _super);

      function CodeCompileTestView() {
        return CodeCompileTestView.__super__.constructor.apply(this, arguments);
      }

      CodeCompileTestView.prototype.template = 'code-compile-test';

      CodeCompileTestView.prototype.className = 'code-compile-test-view';

      CodeCompileTestView.prototype.initialize = function(options) {
        this.model.bind("change", this.render, this);
        this.model.bind("reset", this.render, this);
        return this.parent = options.parent;
      };

      CodeCompileTestView.prototype.render = function() {
        var has_compile_block, has_runtime_block;
        $(this.el).html(HR.appController.template(this.template, this)({
          model: this.model.toJSON()
        }));
        if (this.model.get('status') > 0) {
          has_compile_block = this.$('.compile-time').length > 0;
          has_runtime_block = this.$('.run-time').length > 0;
          if (has_compile_block && !has_runtime_block) {
            this.$('.compile-time').addClass('remove-border');
            this.$('.compile-time').addClass('full-width');
            this.$('.compile-time .rotate').remove();
          }
          if (has_runtime_block && !has_compile_block) {
            this.$('.run-time').addClass('full-width');
            this.$('.run-time .rotate').remove();
          }
        }
        return this;
      };

      return CodeCompileTestView;

    })(window.HR.GenericView);
    HR = window.HR || {};
    return HR.CodeCompileTestView = CodeCompileTestView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var GameCompileTestView, HR;
    GameCompileTestView = (function(_super) {
      __extends(GameCompileTestView, _super);

      function GameCompileTestView() {
        return GameCompileTestView.__super__.constructor.apply(this, arguments);
      }

      GameCompileTestView.prototype.template = 'game-compile-test';

      GameCompileTestView.prototype.className = 'game-compile-test-view';

      GameCompileTestView.prototype.initialize = function(options) {
        this.model.bind("change", this.render, this);
        this.model.bind("reset", this.render, this);
        return this.parent = options.parent;
      };

      GameCompileTestView.prototype.render = function() {
        var that;
        if (!this.game_collection) {
          this.game_collection = new HR.GameCollection;
          that = this;
          HR.requires(['compound/game-views'], function() {
            var game_container_view;
            game_container_view = new HR.GameContainerView({
              collection: that.game_collection
            });
            game_container_view.setElement(that.el).render();
            return that.add_subview(game_container_view);
          });
        }
        if (this.model.get('actors')) {
          _.each(this.model.get('actors'), function(actor) {
            var game;
            if (!this.game_collection.get(actor)) {
              game = new HR.GameModel({
                id: actor,
                codechecker_handle: this.model.get("codechecker_handle")
              });
              return this.game_collection.add(game);
            }
          }, this);
        }
        _.each(this.model.get("games"), function(_game) {
          var game;
          game = this.game_collection.get(_game.id);
          return game.set(_game);
        }, this);
        return this;
      };

      return GameCompileTestView;

    })(window.HR.GenericView);
    HR = window.HR || {};
    return HR.GameCompileTestView = GameCompileTestView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ClientServerCompileTestView, HR;
    ClientServerCompileTestView = (function(_super) {
      __extends(ClientServerCompileTestView, _super);

      function ClientServerCompileTestView() {
        return ClientServerCompileTestView.__super__.constructor.apply(this, arguments);
      }

      ClientServerCompileTestView.prototype.template = 'client-server-compile-test';

      ClientServerCompileTestView.prototype.className = 'client-server-compile-test-view';

      ClientServerCompileTestView.prototype.initialize = function(options) {
        this.model.bind("change", this.render, this);
        this.model.bind("reset", this.render, this);
        return this.parent = options.parent;
      };

      ClientServerCompileTestView.prototype.render = function() {
        var has_compile_block, has_runtime_block;
        $(this.el).html(HR.appController.template(this.template, this)({
          model: this.model.toJSON()
        }));
        if (this.model.get('status') > 0) {
          has_compile_block = this.$('.compile-time').length > 0;
          has_runtime_block = this.$('.run-time').length > 0;
          if (has_compile_block && !has_runtime_block) {
            this.$('.compile-time').addClass('remove-border');
            this.$('.compile-time').addClass('full-width');
            this.$('.compile-time .rotate').remove();
          }
          if (has_runtime_block && !has_compile_block) {
            this.$('.run-time').addClass('full-width');
            this.$('.run-time .rotate').remove();
          }
        }
        return this;
      };

      return ClientServerCompileTestView;

    })(window.HR.GenericView);
    HR = window.HR || {};
    return HR.ClientServerCompileTestView = ClientServerCompileTestView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, LeaderboardView, _ref;
    LeaderboardView = (function(_super) {
      __extends(LeaderboardView, _super);

      function LeaderboardView() {
        return LeaderboardView.__super__.constructor.apply(this, arguments);
      }

      LeaderboardView.prototype.template = 'leaderboard';

      LeaderboardView.prototype.className = 'leaderboard-view container';

      LeaderboardView.prototype.events = {
        "focus .filter-input": "filterInputFocus",
        "click .close": "removeFilter"
      };

      LeaderboardView.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.profile = options.profile;
        this.contest = options.contest;
        this.listenToOnce(this.profile, 'reset', this.render);
        this.listenToOnce(this.contest, 'reset', this.render);
        this.listenTo(this.collection, 'reset', this.render);
        this.challenge = options.challenge;
        this.archived = options.archived;
        this.subViews || (this.subViews = []);
        this.filters = [];
        this.filterKinds = ['school', 'company', 'country'];
        if (this.challenge) {
          return this.filterKinds.push('language');
        }
      };

      LeaderboardView.prototype.languageTooltip = function(leader) {
        var languages;
        languages = _.compact(_.map(leader.languages, function(lang) {
          return lang_display_mapping[lang];
        }));
        if (_.isEmpty(languages)) {
          return "";
        }
      };

      LeaderboardView.prototype.processBlank = function() {
        var blankDiv;
        blankDiv = this.$(".blank-reason");
        if (this.collection.length > 0) {
          blankDiv.parent().hide();
          return false;
        }
        if (!_.isBoolean(this.collection.sync_status)) {
          blankDiv.html(HR.appController.viewLoader(64));
        } else if (this.collection.available) {
          blankDiv.html("Sorry, we require a few more submissions before we generate the leaderboard.");
        } else {
          blankDiv.html("We are currently generating the leaderboard, please bear with us.");
        }
        this.$("#blank-reason-container").show();
        this.$("#leaders").hide();
        return true;
      };

      LeaderboardView.prototype.show_code = function() {
        var current_hacker;
        if (!this.challenge) {
          return false;
        }
        current_hacker = this.collection.current_hacker;
        if (this.contest.get('id') === 1) {
          if (current_hacker && current_hacker.score === this.challenge.get('max_score') && this.challenge.get('can_solve')) {
            return true;
          }
        }
        if (!this.challenge.get('public_solutions')) {
          return false;
        }
        if (this.contest.get('id') !== 1) {
          if (this.contest.get('ended') || (this.contest.get('kind') === 'weekly' && this.challenge.get('has_ended'))) {
            return true;
          } else {
            return false;
          }
        }
        return false;
      };

      LeaderboardView.prototype.removeFilter = function() {
        this.collection.removeFilters();
        this.$(".filters").show();
        this.$(".tag-group").hide();
        return this.$(".filter-input").val("");
      };

      LeaderboardView.prototype.addFilter = function(filter, value) {
        var element;
        this.collection.filters = {};
        this.collection.addFilter(filter, value);
        element = this.$(".tag");
        return element.attr("data-filter", filter, value);
      };

      LeaderboardView.prototype.filterInputFocus = function(e) {
        var that;
        that = this;
        return $(e.currentTarget).live('keyup', function(e) {
          return that.filterInputKeyup(e);
        });
      };

      LeaderboardView.prototype.filterInputKeyup = function(e) {
        var filter, input, value;
        input = $(e.currentTarget);
        if (e.keyCode === 13) {
          filter = input.attr('data-filter');
          value = input.val().replace(/</g, '').replace(/>/g, '');
          if (value.length > 0) {
            this.addFilter(filter, value);
          }
          return input.val('');
        }
      };

      LeaderboardView.prototype.renderFilters = function() {
        var activeFilter, data, filter, index, that, value, _i, _j, _len, _len1, _ref, _ref1, _results, _typeaheadOnselect;
        that = this;
        data = [];
        index = 0;
        _ref = this.filterKinds;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          filter = _ref[_i];
          data.push({
            id: index,
            text: filter
          });
          index += 1;
        }
        this.$("#filter-kind").select2({
          data: data,
          minimumInputLength: 0,
          width: 150,
          placeholder: 'Select filter'
        });
        this.$("#filter-kind").on("change", function(e) {
          filter = e.added.text;
          that.$(".filter-input").hide();
          return that.$("#filter-input-" + filter).show();
        });
        _typeaheadOnselect = function() {
          return that.filterInputKeyup({
            currentTarget: this.$element,
            keyCode: 13
          });
        };
        this.$("#filter-input-school").completer('school', {
          onselect: _typeaheadOnselect
        });
        this.$("#filter-input-company").completer('company', {
          onselect: _typeaheadOnselect
        });
        this.$("#filter-input-country").completer('country', {
          onselect: _typeaheadOnselect
        });
        this.$("#filter-input-language").typeahead({
          source: _.keys(lang_display_mapping),
          onselect: _typeaheadOnselect
        });
        activeFilter = this.collection.filters;
        _ref1 = this.filterKinds;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          filter = _ref1[_j];
          if (activeFilter[filter]) {
            value = activeFilter[filter][0];
            this.$("#filter-input-" + filter).show();
            this.$("#filter-input-" + filter).val(value);
            _results.push(this.$("#filter-kind").select2("data", {
              text: filter
            }));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      LeaderboardView.prototype.getValue = function(filter) {
        if (filter == null) {
          filter = {};
        }
        if (filter.kind && filter.value && filter.value.length > 0) {
          return "" + filter.kind + " = " + filter.value;
        } else {
          return "";
        }
      };

      LeaderboardView.prototype.render = function() {
        var activeFilter, bread_crumbs_view, current_username, div, filter, freeze_time_minutes, has_current_leader, leadersContainer, that, _i, _len, _ref, _view;
        freeze_time_minutes = 0;
        if (this.contest.get('leaderboard_freeze_time')) {
          freeze_time_minutes = (new Date(this.contest.get('endtime')) - new Date(this.contest.get('leaderboard_freeze_time'))) / 60000;
        }
        activeFilter = {};
        _ref = this.filterKinds;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          filter = _ref[_i];
          if (this.collection.filters[filter]) {
            activeFilter.kind = filter;
            activeFilter.value = this.collection.filters[filter][0];
          }
        }
        $(this.el).html(HR.appController.template(this.template, this)({
          contest: this.contest.toJSON(),
          archived: this.archived,
          challenge: this.challenge ? this.challenge.toJSON() : null,
          collection: this.collection,
          activeFilter: activeFilter,
          value: this.getValue(activeFilter),
          filters: this.filterKinds,
          showPractice: this.collection.includePractice,
          show_code: this.show_code(),
          freeze_time_minutes: freeze_time_minutes,
          that: this
        }));
        if (this.getValue(activeFilter).length > 0) {
          this.$(".filters").hide();
          this.$(".tag-group").show();
        }
        bread_crumbs_view = HR.util.renderBreadCrumbs(this.$('div.breadcrumbs'), this.collection.breadCrumbs());
        this.add_subview(bread_crumbs_view);
        this.renderFilters();
        if (this.processBlank()) {
          return this;
        }
        this.$("#blank-reason-container").hide();
        this.$("#leaders").show();
        that = this;
        if (this.collection.sync_status) {
          has_current_leader = false;
          current_username = this.profile.get('username');
          leadersContainer = $();
          _.each(this.collection.models, function(model, index) {
            var _view;
            model.is_current = model.get('hacker') === current_username;
            if (model.is_current) {
              has_current_leader = true;
            }
            _view = new HR.LeaderboardListView({
              show_code: this.show_code(),
              contest: this.contest.toJSON(),
              archived: that.archived,
              index: index,
              leader: model.toJSON(),
              challenge: this.collection.challenge_slug,
              is_current_hacker: model.is_current,
              that: this
            });
            this.subViews.push(_view);
            leadersContainer.push(_view.render().el);
            return this.add_subview(_view);
          }, this);
          $(this.el).find('div#leaders').append(leadersContainer);
          if (current_username && this.collection.current_hacker && this.collection.current_hacker.rank && !has_current_leader) {
            _view = new HR.LeaderboardListView({
              show_code: this.show_code(),
              contest: this.contest.toJSON(),
              archived: that.archived,
              index: 0,
              leader: this.collection.current_hacker,
              challenge: this.collection.challenge_slug,
              is_current_hacker: true,
              that: this
            });
            this.subViews.push(_view);
            div = $(this.el).find('div#leader-self');
            div.append(_view.render().el);
            this.add_subview(_view);
            div.show();
          }
          if (this.contest.get('kind') === 'acm' || this.contest.get('kind') === 'ieee') {
            HR.util.pagination(this.$('.pagination-wrapper'), this.collection.getTotal(), "" + (this.collection.pageURL()) + "/", this.collection.getCurrentPage(), this.collection, this.collection.limit, 10, "backbone", false);
          } else {
            HR.util.pagination(this.$('.pagination-wrapper'), this.collection.getTotal(), "" + (this.collection.pageURL()) + "/", this.collection.getCurrentPage(), this.collection, this.collection.limit);
          }
        }
        return this;
      };

      return LeaderboardView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.LeaderboardView = LeaderboardView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, LeaderboardListView, _ref;
    LeaderboardListView = (function(_super) {
      __extends(LeaderboardListView, _super);

      function LeaderboardListView() {
        return LeaderboardListView.__super__.constructor.apply(this, arguments);
      }

      LeaderboardListView.prototype.initialize = function(options) {
        var _base;
        this.options = options;
        this.contest = options.contest;
        this.leader = options.leader;
        return (_base = this.leader).download_link || (_base.download_link = "/rest/contests/" + this.contest.slug + "/challenges/" + this.options.challenge + "/hackers/" + this.leader.hacker + "/download_solution");
      };

      LeaderboardListView.prototype.template = 'leaderboard-list';

      LeaderboardListView.prototype.className = 'leaderboard-list-view';

      LeaderboardListView.prototype.languageLink = function(language) {
        return "" + (HR.appController.get_current_contest_namespace()) + "/challenges/" + this.collection.challenge_slug + "/language/" + language + "/leaderboard";
      };

      LeaderboardListView.prototype.languages = function() {
        var languages;
        return languages = _.compact(_.map(this.leader.languages, function(lang) {
          return lang_display_mapping[lang];
        }));
      };

      LeaderboardListView.prototype.challenges = function() {
        return _.map(this.leader.challenges, function(challenge) {
          return challenge.name;
        });
      };

      LeaderboardListView.prototype.timeTooltip = function() {
        var tooltip, username;
        if (this.leader.submitted_at) {
          username = this.options.is_current_hacker ? 'You' : this.leader.hacker || 'N/A';
          tooltip = "" + (_.escape(username)) + " last submitted " + this.leader.submitted_at + " ago";
          if (this.leader.penalty > 0) {
            tooltip += " and penalized by " + this.leader.penalty_display;
          }
          return tooltip;
        } else {
          return null;
        }
      };

      LeaderboardListView.prototype.scoreTooltip = function() {
        var challenges, count, sliceLimit, tooltip;
        challenges = this.challenges();
        sliceLimit = 3;
        tooltip = "";
        count = challenges.length;
        challenges = challenges.slice(0, sliceLimit);
        if (count > 1) {
          tooltip += "Scored by summing up individual scores for " + (challenges.join(', '));
          if (count > challenges.length) {
            tooltip += " and " + (count - challenges.length) + " more";
          }
        } else {
          tooltip += "Scored based on the score for " + (challenges.join(', '));
        }
        return tooltip;
      };

      LeaderboardListView.prototype.formatTime = function(seconds) {
        seconds = parseInt(Math.ceil(seconds));
        return "" + (parseInt(seconds / 60)) + ":" + (parseInt((seconds % 60) / 10)) + ((seconds % 60) % 10);
      };

      LeaderboardListView.prototype.format = function() {
        var challenge, _i, _len, _ref, _results;
        if (this.leader.challenges) {
          _ref = this.leader.challenges;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            challenge = _ref[_i];
            challenge.time_taken_formatted = this.formatTime(challenge.time_taken);
            _results.push(challenge.tooltip = "" + challenge.submissions + " - attempts<br/>Solved at - " + challenge.time_taken_formatted + "<br/>Penalty time - " + (Math.ceil(challenge.penalty / 60)));
          }
          return _results;
        }
      };

      LeaderboardListView.prototype.scoreDetail = function() {
        var challenge, index, text, _i, _len, _ref;
        if (this.leader.challenges) {
          text = "";
          _ref = this.leader.challenges;
          for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
            challenge = _ref[index];
            text += "" + (String.fromCharCode(65 + index)) + ": " + challenge.time_taken_formatted + " + " + (challenge.penalty / 60);
            text += "<br/>";
          }
          return text;
        }
      };

      LeaderboardListView.prototype.isPublishedChallenge = function() {
        if (this.leader.submission_id === null) {
          return false;
        } else {
          return true;
        }
      };

      LeaderboardListView.prototype.render = function() {
        var context;
        if (this.contest.leaderboard_format === "acm") {
          this.format();
        }
        context = _.extend(this.options, {
          timeTooltip: this.timeTooltip(),
          scoreTooltip: this.scoreTooltip(),
          isPublishedChallenge: this.isPublishedChallenge()
        });
        if (this.contest.leaderboard_format === "acm") {
          context = _.extend(context, {
            score_detail: this.scoreDetail()
          });
        }
        $(this.el).html(HR.appController.template(this.template, this)(context));
        this.delegateEvents();
        return this;
      };

      return LeaderboardListView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.LeaderboardListView = LeaderboardListView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, ModalView, _ref;
    ModalView = (function(_super) {
      __extends(ModalView, _super);

      function ModalView() {
        return ModalView.__super__.constructor.apply(this, arguments);
      }

      ModalView.prototype.template = "modal";

      ModalView.prototype.className = "modal-view";

      ModalView.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.id = Math.round(Math.random() * 100000000000000);
        if (options.parent) {
          return this.parent = options.parent;
        }
      };

      ModalView.prototype.getEl = function() {
        return this.el;
      };

      ModalView.prototype.getThis = function() {
        return this;
      };

      ModalView.prototype.render = function() {
        var that, _data;
        if ($('body').find('#modal-wrap').length === 0) {
          $('body').append('<div id="modal-wrap"></div>');
        }
        if ($('#modal-wrap').find("#modal-" + this.id).length === 0) {
          $('#modal-wrap').append("<div id='modal-" + this.id + "'></div>");
        }
        this.el = $("body #modal-wrap #modal-" + this.id);
        $(this.el).html(HR.appController.template(this.template, this));
        if (this.data) {
          if (_.isFunction(this.data)) {
            _data = this.data();
          } else {
            _data = this.data;
          }
          if (_data.className) {
            $(this.el).find('.modal').addClass(_data.className);
          }
          if (_data.header) {
            if (_data.header.type === "text") {
              $(this.el).find('.header-msg').html(_data.header.value);
            } else if (_data.header.type === "template") {
              $(this.el).find('.header-msg').html(HR.appController.template(_data.header.value, this)({
                data: _.isFunction(_data.header.data) ? _data.header.data.call(this) : _data.header.data
              }));
            }
          }
          if (_data.body) {
            if (_data.body.type === "text") {
              $(this.el).find('.modal-body').html(_data.body.value);
            } else if (_data.body.type === "template") {
              $(this.el).find('.modal-body').html(HR.appController.template(_data.body.value, this)({
                data: _.isFunction(_data.body.data) ? _data.body.data.call(this) : _data.body.data
              }));
            }
          }
          if (_data.footer) {
            if (_data.footer.type === "text") {
              $(this.el).find('.modal-footer').html(_data.footer.value);
            } else if (_data.footer.type === "template") {
              $(this.el).find('.modal-footer').html(HR.appController.template(_data.footer.value, this)({
                data: _.isFunction(data.footer.data) ? data.footer.data.call(this) : data.footer.data
              }));
            }
          } else {
            $(this.el).find('.modal-footer').remove();
          }
        }
        if (this.liveEvents) {
          that = this;
          _.each(this.liveEvents, function(callback, index) {
            var ev, eventConfig, sl, sp;
            sp = index.indexOf(" ");
            ev = index.substr(0, sp);
            sl = index.substr(sp + 1);
            eventConfig = {
              that: that
            };
            return $(sl).die(ev).unbind(ev).live(ev, eventConfig, that[callback]);
          });
        }
        that = this;
        setTimeout(function() {
          if ($(that.el).find('.modal').length > 0 && $(that.el).find('.modal').find('.gray').length === 0 && $(that.el).find('.modal').css('display') === "none") {
            return $(that.el).find('.modal').modal('show');
          }
        });
        this.delegateEvents();
        return this;
      };

      return ModalView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ModalView = ModalView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var HR, SocialShareView, _ref;
    SocialShareView = (function(_super) {
      __extends(SocialShareView, _super);

      function SocialShareView() {
        return SocialShareView.__super__.constructor.apply(this, arguments);
      }

      SocialShareView.prototype.template = 'social-share';

      SocialShareView.prototype.className = 'social-share-view';

      SocialShareView.prototype.initialize = function(options) {
        this.title = options.title;
        this.message = options.message;
        this.tweet = options.tweet;
        this.url = options.url;
        return this.type = options.type;
      };

      SocialShareView.prototype.render = function() {
        var dialog_options, url, url_prefix, url_suffix;
        url_prefix = document.location.protocol + '//' + document.location.host;
        url_suffix = "" + (HR.appController.get_current_contest_slug_url());
        url = url_prefix + url_suffix;
        dialog_options = {
          title: this.title,
          body: "<center><p> " + this.message + " </p> <p> Share your success with your friends</p> <p class='block-center'><a class='fb-share' style='cursor:pointer;'><img src='/assets/fb-share.png'></a>&nbsp;&nbsp;&nbsp;<a class='tweet' style='cursor:pointer;'><img src='/assets/tweet-filler.png'></a> </p> <p><small><a class='js-disable-notifications'> Don't show these notifications anymore </a></small></p></center>",
          events: {
            "click a.fb-share": (function(_this) {
              return function(e) {
                e.preventDefault();
                return HR.appController.facebook_share(_this.url, _this.tweet);
              };
            })(this),
            "click a.tweet": (function(_this) {
              return function(e) {
                e.preventDefault();
                return HR.appController.twitter_share(_this.tweet);
              };
            })(this),
            "click a.js-disable-notifications": (function(_this) {
              return function(e) {
                $.cookie("socialshare-" + _this.type, "disabled");
                return _this.dialog.destroy();
              };
            })(this)
          }
        };
        if ($.cookie("socialshare-" + this.type) !== "disabled") {
          this.dialog = new HR.util.ShowDialog(dialog_options);
          return this.dialog.render();
        }
      };

      return SocialShareView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.SocialShareView = SocialShareView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var E404View, HR, _ref;
    E404View = (function(_super) {
      __extends(E404View, _super);

      function E404View() {
        return E404View.__super__.constructor.apply(this, arguments);
      }

      E404View.prototype.template = 'dashboard/e404';

      E404View.prototype.className = 'e404-view';

      E404View.prototype.render = function() {
        $(this.el).html(HR.appController.template(this.template, this)());
        return this;
      };

      return E404View;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.E404View = E404View;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ELoginView, HR, _ref;
    ELoginView = (function(_super) {
      __extends(ELoginView, _super);

      function ELoginView() {
        return ELoginView.__super__.constructor.apply(this, arguments);
      }

      ELoginView.prototype.render = function() {
        this.dialog || (this.dialog = new HR.util.ShowLoginDialog({
          show_sign_up_link: true,
          error_message: "Please sign up or log in to view this page",
          success_callback: function() {
            $("body").html("Loggin you in...").addClass("m").css("margin-top", "10%");
            return window.location.reload();
          }
        }));
        this.dialog.render();
        return this;
      };

      return ELoginView;

    })(window.HR.GenericView);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ELoginView = ELoginView;
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var ABTestingView, HR, _ref;
    ABTestingView = (function(_super) {
      __extends(ABTestingView, _super);

      function ABTestingView() {
        return ABTestingView.__super__.constructor.apply(this, arguments);
      }

      ABTestingView.prototype.events = {
        'click a[data-ab-testing-status]': 'updateStatus'
      };

      ABTestingView.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        ABTestingView.__super__.initialize.apply(this, arguments);
        if (!this.model) {
          this.model = new HR.ABTest();
          if (options.test) {
            this.model.test = options.test;
          }
        }
        if (options.variants) {
          this.variants = options.variants;
        }
        return this;
      };

      ABTestingView.prototype.updateStatus = function(e) {
        this.model.updateStatus($(e.currentTarget).attr('data-ab-testing-status'));
        return this;
      };

      ABTestingView.prototype.render = function() {
        if (this._has_rendered) {
          if (this.el) {
            this.variant.el = this.el;
          }
          this.variant.render();
          if (this.el) {
            this.$el = $(this.el);
          }
          this.delegateEvents();
        } else {
          this.model.fetch({
            success: (function(_this) {
              return function() {
                _this.variant = _.result(_this.variants, _this.model.get('variant'));
                if (_this.variant) {
                  if (_.isFunction(_this.variant)) {
                    _this.variant = new _this.variant();
                  }
                  if (_this.el) {
                    _this.variant.el = _this.el;
                  }
                  _this.variant.render();
                  if (_this.el) {
                    _this.$el = $(_this.el);
                  }
                  _this.delegateEvents();
                  return _this._has_rendered = true;
                }
              };
            })(this)
          });
        }
        return this;
      };

      return ABTestingView;

    })(Backbone.View);
    HR = (_ref = window.HR) != null ? _ref : {};
    return HR.ABTestingView = ABTestingView;
  });

}).call(this);
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MA RKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//












//////////////////////////////////////////////
// Basic views
/////////////////////////////////////////////

















// Meta views





// Challenges views





// Onboarding views


//













// AB Testing


/////////////////////////////////////////////////
// Don't add any way without any compelling reson
// If the view is supposed to be rendered on most
// page loads then okay.
// -- Rohan
////////////////////////////////////////////////


$('.dropdown-toggle').dropdown();
$(".level-nav-wrap ul li a").click(function(e) {
    e.preventDefault();
    $(".level-nav-wrap ul li a").addClass("selected").not(this).removeClass("selected");
});
$(".level-nav-wrap ul li").mouseenter ( function () {
    $(this).children(".level-dropdown").show().removeClass("hide").find(".slide").slideDown(200).removeClass("hide");
});
$(".level-nav-wrap ul li").mouseleave ( function () {
    $(this).children(".level-dropdown").find(".slide").slideUp(200).addClass("hide");
    $(this).children(".level-dropdown").delay(100).slideUp(100);
});
$("[rel=tooltip]").live('mouseenter', function(e){
    $(this).tooltip('show');
});
$("[rel=tooltip]").live('mouseleave', function(e){
    $(".tooltip").fadeOut();
});
$("[rel=tooltip]").live('click', function(e){
    $(".tooltip").hide();
});
$(".collapse").collapse({
    toggle: true
});
$(".toggle-plus").click (function() {
    $(this).toggleClass("active");
});
$(".expand .expand-init").click ( function (e) {
    e.preventDefault();
    $(this).parent(".expand").find(".expand-wrap").slideDown(200).addClass("block").css("height: auto");
});

$(function(){
    $("#selected-language").live('click', function(e) {
        e.preventDefault();
    });
});

$(function(){
    setWrapperHeight = function(){
        $("#wrapper").css("min-height", $("body").height() - $("footer").height() - 64);
    };
    setWrapperHeight();
    $(window).resize(setWrapperHeight);
});

// Open alien domains in a different page always.
$('a').live('click', function(e){
    source = $(e.srcElement)
    if (source.is('a') && e.srcElement.hostname
        && e.srcElement.hostname != window.location.hostname){
        source.attr('target', '_blank')
    }
});

 /* POPOVER DATA-API
  * ============ */
$(function () {
    $('body').on('click.popover.data-api', '[data-toggle="popover"]', function (e) {
      e.preventDefault()
      $(this).popover({
        "trigger" : "hover"
      }).popover("toggle")
    })
})

HR.TRANSLATION_LANGUAGES = {"Chinese":"zh","English":"en","Japanese":"ja","Portuguese":"pt","Russian":"ru"}
;
