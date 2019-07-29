(function() {
    var t = function(t, n) {
            function r() {
                this.constructor = t
            }
            for (var i in n) e.call(n, i) && (t[i] = n[i]);
            return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
        },
        e = {}.hasOwnProperty;
    this.tn_game = {
        project1_init: function(t) {
            var e;
            return e = new tn.project1(t), e.start()
        },
        qa_init: function(t, e) {
            var n;
            return null == e && (e = 0), n = new tn.qa(t), 1 === e ? n._show_leaderBoard() : void 0
        }
    }, window.tn.leaderBoard = function() {
        function t(t) {
            this.zid = t, this.gameOver = $("#section-result .gameOver"), this.leaderBoard = $("#section-result .leaderBoard"), this.builder = $("#section-result .leaderBuilder"), this.rank_lists = {
                daily: $("#popoutDailyTop .rankList"),
                history: $("#popoutHistoryTop .rankList")
            }, this._builder_function_init(), this.rankGetter = new tn.GetJSON("/game/ajax_get_leader_board"), this.rankGetter.success = function(t) {
                return function(e) {
                    return t._show_result(e.result)
                }
            }(this), this.rankUpdator = new tn.GetJSON("/game/ajax_add_to_leader_board"), this.rankUpdator.success = function(t) {
                return function(e) {
                    return "" !== e.result.url ? window.location = e.result.url : t._show_leaderBoard()
                }
            }(this)
        }
        return t.prototype._builder_function_init = function() {
            var t, e;
            return e = this.builder.find(".sumbitBtn"), e.click(function(t) {
                return function() {
                    return t.builder.hasClass("active") && !e.hasClass("loading") ? (e.addClass("loading"), t._update_leader()) : void 0
                }
            }(this)), t = this.builder.find(".cancelBtn"), t.click(function(e) {
                return function() {
                    return e.builder.hasClass("active") && !t.hasClass("loading") ? (t.addClass("loading"), e._show_leaderBoard()) : void 0
                }
            }(this))
        }, t.prototype._reset = function() {
            var t, e, n, r;
            $("#section-result").addClass("hide"), this.gameOver.addClass("hide").removeClass("fadeOut"), this.builder.addClass("hide"), this.leaderBoard.addClass("hide"), n = this.rank_lists, r = [];
            for (e in n) t = n[e], r.push(this.rank_lists[e].html(""));
            return r
        }, t.prototype.run = function(t, e, n, r, i) {
            var s;
            return this.score = t, this.count_correct = e, this.count_wrong = n, this.count_time = r, this.update = null != i ? i : 1, s = 0, $("#section-result").removeClass("hide"), 1 === this.update && (setTimeout(function(t) {
                return function() {
                    return t.gameOver.removeClass("hide")
                }
            }(this), s), s += 1e3, setTimeout(function(t) {
                return function() {
                    return t.gameOver.addClass("fadeOut")
                }
            }(this), s), s += 800), setTimeout(function(t) {
                return function() {
                    return t._get_result()
                }
            }(this), s)
        }, t.prototype._get_result = function() {
            var t;
            return t = {
                zid: this.zid,
                score: this.score,
                update: this.update
            }, this.rankGetter._get(t)
        }, t.prototype._show_result = function(t) {
            var e, n, r, i, s, o, a, u, d, l, c, h, _, f;
            if (h = 0, this.leaders = t.leaderBoard, this.daily_leaders = t.dailyBoard, this.user_rank = t.rank_arr, this.user_record = t.user_record, this.leaders)
                for (e = 0, _ = this.leaders, u = 0, l = _.length; l > u; u++) s = _[u], "" !== s.name && (e += 1, a = 1 === s.user ? 1 : 0, this._assign_leader("history", e, s.name, s.score, a));
            if (this.daily_leaders)
                for (e = 0, f = this.daily_leaders, d = 0, c = f.length; c > d; d++) s = f[d], "" !== s.name && (e += 1, a = 1 === s.user ? 1 : 0, this._assign_leader("daily", e, s.name, s.score, a));
            return this.user_record && (n = this.leaderBoard.find(".leader.personal"), n.find(".time").text(this.user_record.time + this.user_record.suffix), n.find(".score").text(this.user_record.score)), this.leaderBoard.find(".stat.correct .val").text(this.count_correct).end().find(".stat.wrong .val").text(this.count_wrong).end().find(".stat.time .val").text(this.count_time).end().find(".stat.score .val").text(this.score), r = this.user_rank.lead, i = this.user_rank.daily_lead, o = this.user_rank.rank, 0 === this.update ? this._update_leader(jLang.record.name) : r > 0 || i > 0 ? setTimeout(function(t) {
                return function() {
                    return t._show_leaderBuilder(r)
                }
            }(this), h) : this._show_leaderBoard()
        }, t.prototype._assign_leader = function(t, e, n, r, i) {
            var s, o, a, u;
            return null == i && (i = 0), 1 === e && (s = "daily" === t ? this.leaderBoard.find(".leader.daily") : this.leaderBoard.find(".leader.history"), s.find(".name").text(n), s.find(".score").text(r)), a = ['<li class="li">', '<span class="name">' + n + "</span>", '<span class="score">' + r + "</span>", "</li>"].join(""), u = this.rank_lists[t], o = null != u ? u.find(".li").eq(e - 1) : void 0, o.length ? o.before(1 === i ? $(a).addClass("user") : a) : u.append(1 === i ? $(a).addClass("user") : a)
        }, t.prototype._show_leaderBuilder = function(t) {
            return this.builder.removeClass("hide").addClass("active")
        }, t.prototype._update_leader = function(t) {
            var e;
            return null == t && (t = ""), "" === t && (t = this.builder.find(".nameInput").val()), "" !== t ? (this.name = t, e = {
                zid: this.zid,
                score: this.score,
                name: t,
                count: {
                    correct: this.count_correct,
                    wrong: this.count_wrong,
                    time: this.count_time
                }
            }, this.rankUpdator._get(e)) : this._show_leaderBoard()
        }, t.prototype._show_leaderBoard = function() {
            var t, e, n, r, i, s, o, a, u;
            return i = this.user_rank.rank, o = this.user_rank.sum, r = o > 0 ? Math.round(100 - i / o * 100) : 100, 1 > r ? r = 1 : r > 99 && (r = 99), this.name && "" !== this.name && (n = this.user_rank.lead, t = this.user_rank.daily_lead, (n > 0 || t > 0) && $(".rankPopout .rankList .li.user").remove(), n > 0 && this._assign_leader("history", n, this.name, this.score, 1), t > 0 && this._assign_leader("daily", t, this.name, this.score, 1)), this.leaderBoard.find(".personalRank .percent .number").text(r), a = this.leaderBoard.find(".personalRank .rankInfo"), a.find(".total .val").text(o).end().find(".personal .val").text(i + 1), this.leaderBoard.removeClass("hide"), u = this.leaderBoard.find(".spinner"), null != u && (e = 360 * r / 100, 180 >= e ? (s = "rotate(" + e + "deg)", u.removeClass("aboveAvg").find(".left .pie").css({
                "-webkit-transform": s,
                "-moz-transform": s,
                "-ms-transform": s,
                "-o-transform": s,
                transform: s
            })) : (u.addClass("aboveAvg"), e -= 180, s = "rotate(" + e + "deg)", u.find(".right .pie").css({
                "-webkit-transform": s,
                "-moz-transform": s,
                "-ms-transform": s,
                "-o-transform": s,
                transform: s
            }))), this.builder.addClass("hide").removeClass("active").find(".btn").removeClass("loading")
        }, t
    }(), window.tn.project1 = function() {
        function e(e) {
            var n;
            this.sid = e, this.html = $("html, body"), this._ui_init(), this._quiz_init(), this.progressBar = new tn.progressBarOverlay("quiz_loading"), n = function(e) {
                function n(t) {
                    this.url = t, n.__super__.constructor.call(this, this.url)
                }
                return t(n, e), n
            }(tn.GetJSON), this.result_getter = new n("/game/ajax_get_activity_result"), this.result_getter.success = function(t) {
                return function(e) {
                    return t._generate_result(e.result)
                }
            }(this)
        }
        return e.prototype.answers = [], e.prototype.start = function() {
            return this._go_to_quiz(0)
        }, e.prototype._reset = function() {
            return $("#section-quizzes .quizzes .quiz").hide(), this.progressBar._reset(), this.answers = []
        }, e.prototype._ui_init = function() {
            var t, e, n, r, i;
            return t = $("body"), r = $("#section-scrollDown"), this.html.scrollTop(0), $(window).scroll(function(e) {
                return function() {
                    var e, n;
                    return e = $(window).scrollTop(), n = tn.window.height, .2 * n > e ? r.css("bottom", -(44 + e)) : r.css("bottom", -(44 + .2 * n)), 44 + 1.02 * n > e ? t.addClass("fixed") : t.removeClass("fixed")
                }
            }(this)), i = $("#section-curtain .title"), e = $("#section-curtain .content"), n = $("#section-curtain .globe"), $(window).resize(function() {
                var t, r;
                return r = tn.window.width, t = tn.window.height, 800 > r && .8 * r > t ? (i.css({
                    bottom: "85%"
                }), e.css({
                    bottom: "75%"
                })) : 800 > r ? (i.css({
                    bottom: "62%"
                }), e.css({
                    bottom: "50%"
                })) : (i.css({
                    bottom: 360
                }), e.css({
                    bottom: 320
                })), 800 > r ? n.css({
                    bottom: -(.5 * r)
                }) : n.css({
                    bottom: -500
                })
            }).trigger("resize"), $(".navToQuiz").click(function(t) {
                return function() {
                    return t._scroll_to_quiz()
                }
            }(this)), r.click(function(t) {
                return function() {
                    return t._scroll_to_quiz()
                }
            }(this)), $("#replayGame").click(function(t) {
                return function() {
                    return t._reset(), t.start()
                }
            }(this))
        }, e.prototype._scroll_to_quiz = function() {
            return this.html.animate({
                scrollTop: .92 * tn.window.height
            }, 1e3)
        }, e.prototype._quiz_init = function() {
            return $(".quiz .answer").loop(function(t) {
                return function(e) {
                    var n, r, i;
                    return r = e.parents(".quiz").attr("id").split("_")[1], n = +r + 1, i = {
                        aid: e.attr("aid"),
                        qid: +r,
                        next_id: n
                    }, e.click(i, function(e) {
                        return t.answers.push(e.data.aid), t._go_to_quiz(e.data.next_id)
                    })
                }
            }(this))
        }, e.prototype._go_to_quiz = function(t, e) {
            var n;
            return null == t && (t = 0), null == e && (e = 300), n = 0, "result" === t && this._fade_out($("#quiz_loading"), e), $("#quiz_" + (t - 1)).length && this._fade_out($("#quiz_" + (t - 1)), e), $("#quiz_" + t).length ? setTimeout(function(n) {
                return function() {
                    return n._fade_in($("#quiz_" + t), e)
                }
            }(this), e + 50) : setTimeout(function(t) {
                return function() {
                    return $("#quiz_loading").fadeIn(e, function() {
                        return t.progressBar._loading(0), t._get_result()
                    })
                }
            }(this), e + 50)
        }, e.prototype._fade_in = function(t, e, n) {
            var r;
            return null == n && (n = 100), t.fadeIn(e), r = t.find(".answer"), setTimeout(function(t) {
                return function() {
                    return t._grid_animation(r, 0, n)
                }
            }(this), e / 2)
        }, e.prototype._fade_out = function(t, e) {
            return t.fadeOut(e, function() {
                return t.find(".answer").removeClass("active")
            })
        }, e.prototype._anim_sequence = [1, 2, 4, 7, 6, 5, 3, 0], e.prototype._grid_animation = function(t, e, n, r) {
            return null == r && (r = !0), setTimeout(function(i) {
                return function() {
                    var s;
                    return s = i._anim_sequence[e], r === !0 ? t.eq(s).addClass("active") : t.eq(s).removeClass("active"), e !== t.length - 1 ? i._grid_animation(t, e + 1, n) : void 0
                }
            }(this), n)
        }, e.prototype._get_result = function() {
            var t;
            return t = {
                sid: this.sid,
                answers: this.answers
            }, this.result_getter._get(t)
        }, e.prototype._generate_result = function(t) {
            var e;
            return this.progressBar._finished(), e = t.cover, $("#quiz_result").css("background-image", "url('" + e + "')").find(".cityName").text(t.city).end().find(".more .desc").text(t.desc).end().find(".link").attr("href", t.link).end().find(".totalCount").text(t.total).end().find(".ansCount").text(t.ans_count), setTimeout(function(t) {
                return function() {
                    return t._go_to_quiz("result")
                }
            }(this), 1e3)
        }, e
    }(), window.tn.qa = function() {
        function e(e, n, r) {
            var i;
            this.zid = e, this.max_level = null != n ? n : jLang.max_level, this.max_XP = null != r ? r : jLang.max_xp, this.quizHolder = $("#section-quizzes .quizzes .quiz"), this.loadingView = $("#section-loading"), this.roulette = new tn.roulette, this.scoreBoard = $("#section-quizzes .profile .scoreBoard"), this.leaderBoard = new tn.leaderBoard(this.zid), this._ui_init(), this._function_init(), i = function(e) {
                function n(t) {
                    this.url = t, n.__super__.constructor.call(this, this.url)
                }
                return t(n, e), n
            }(tn.GetJSON), this.qa_getter = new i("/game/ajax_get_qa"), this.qa_getter.success = function(t) {
                return function(e) {
                    var n;
                    return n = e.result, t.q = n.q, t.a = n.a, t._play_level()
                }
            }(this)
        }
        return e.prototype.level = 0, e.prototype.max_level = 0, e.prototype.XP = 0, e.prototype.max_XP = 0, e.prototype.q = [], e.prototype.a = [], e.prototype.open_to_answer = 0, e.prototype.score = 0, e.prototype.score_round = 0, e.prototype.countdown = 6, e.prototype.point = 100, e.prototype.point_rate = 1, e.prototype.hint = 0, e.prototype.count_correct = 0, e.prototype.count_wrong = 0, e.prototype.count_time = 0, e.prototype._reset = function() {
            return this.level = 1, this.XP = 0, this.score = 0, this.score_round = 0, this.countdown = 6, this.point = 100, this.point_rate = 1, this.hint = 0, this.count_correct = 0, this.count_wrong = 0, this.count_time = 0, $(".btn.loading").removeClass("loading"), this.roulette._reset(), this._score_board_reset(), this.loadingView.removeClass("hide").find(".loader").fadeIn(300), this.quizHolder.addClass("hide"), this.leaderBoard._reset()
        }, e.prototype._ui_init = function() {
            var t, e;
            return t = $("#shiftingBar"), e = function() {
                return $("#section-curtain").hasClass("hidden") ? void 0 : (t.find(".item").eq(0).addClass("hide").appendTo(t).removeClass("hide"), setTimeout(function() {
                    return e()
                }, 1500))
            }, e(), $("#popoutPromo .startBtn").click(function() {
                return $(this).parents("#popoutPromo").find(".popoutCancel").trigger("click")
            }), $(".popoutBtn").loop(function(t) {
                return t.click(function() {
                    var e, n;
                    return n = t.attr("action"), (e = $("#popout" + n)) ? $("#popout" + n).removeClass("hidden") : void 0
                })
            }), $(".popout").loop(function(t) {
                return t.click(function(t) {
                    return t.target === this ? $(this).addClass("hidden") : void 0
                })
            }), $(".popoutCancel").loop(function(t) {
                return t.click(function() {
                    return $(this).parents(".popout").addClass("hidden")
                })
            }), $(".startQuiz").click(function(t) {
                return function() {
                    return t._start()
                }
            }(this))
        }, e.prototype._function_init = function() {
            var t;
            return this.roulette._exit = function(t) {
                return function(e, n) {
                    return null == e && (e = 0), -1 === e ? setTimeout(function() {
                        return t._game_over()
                    }, 1e3) : t._bonus(e, n)
                }
            }(this), this.quizHolder.find(".answers .ans").loop(function(t) {
                return function(e) {
                    return e.click(function() {
                        var n;
                        if (t.open_to_answer && !e.hasClass("disabled")) return null != (n = t.quizHolder.find(".countDown .spinner")) && n.addClass("paused"), t.open_to_answer = 0, e.addClass("selected"), t._check_ans()
                    })
                }
            }(this)), t = $("#section-result .btnReplay"), t.click(function(e) {
                return function() {
                    return t.hasClass("loading") ? void 0 : (t.addClass("loading"), e._reset(), e._next_level())
                }
            }(this))
        }, e.prototype._start = function() {
            var t;
            return this.level = 1, t = 0, $("#section-curtain").animate({
                top: -tn.window.height
            }, tn.window.height), t += tn.window.height, setTimeout(function(t) {
                return function() {
                    return t._next_level()
                }
            }(this), t)
        }, e.prototype._show_leaderBoard = function() {
            var t, e;
            return $("#section-curtain").addClass("hide"), e = jLang.record, t = e.count, this.leaderBoard.run(e.score, t.correct, t.wrong, t.time, 0)
        }, e.prototype._next_level = function(t) {
            var e;
            return null == t && (t = this.level), this.loadingView.removeClass("hide"), this.roulette._reset(), this.XP = 0, e = {
                zid: jLang.zid,
                level: t
            }, this.qa_getter._get(e)
        }, e.prototype._play_level = function(t) {
            var e, n, r, i, s, o, a, u, d, l;
            if (null == t && (t = this.XP), this.loadingView.removeClass("hide").find(".loader").fadeIn(300), this.quizHolder.removeClass("result"), null != (d = this.quizHolder.find(".countDown .spinner")) && d.removeClass("spin"), this.quizHolder.find(".answers .ans").removeClass("selected rightAns"), a = 500, u = this.q[t], r = this.a[t], i = this.loadingView.find(".categ"), setTimeout(function(e) {
                    return function() {
                        return i.find(".round").text("Round " + (t + 1)).end().find(".name").text(u.categ).end().fadeIn(300)
                    }
                }(this), a), a += 1500, setTimeout(function(t) {
                    return function() {
                        return i.fadeOut(300)
                    }
                }(this), a), a += 300, this.quizHolder.find(".question").text(u.name), this.quizHolder.find(".ans").each(function(t) {
                    return $(this).attr("aid", r[t].aid), $(this).text(r[t].name)
                }), this.quizHolder.find(".answers .ans").removeClass("disabled"), this.hint > 0)
                for (n = [], s = 0, this.quizHolder.find(".answers .ans").loop(function(t) {
                        var e;
                        return e = t.attr("aid"), $.inArray(e, jLang.ans_set) < 0 && n.push(s), s++
                    }), n = tn.shuffle(n), e = o = 0, l = this.hint - 1; l >= 0 ? l >= o : o >= l; e = l >= 0 ? ++o : --o) this.quizHolder.find(".answers .ans").eq(n[e]).addClass("disabled");
            return setTimeout(function(t) {
                return function() {
                    return t.loadingView.addClass("fadeOut")
                }
            }(this), a), a += 100, setTimeout(function(t) {
                return function() {
                    return t.loadingView.find(".loader").fadeOut(200, function() {
                        return t.loadingView.addClass("hide").removeClass("fadeOut")
                    }), t.open_to_answer = 1, t._count_down()
                }
            }(this), a)
        }, e.prototype._count_down = function(t) {
            var e, n;
            return null == t && (t = this.countdown), this.open_to_answer ? (t === this.countdown && null != (e = this.quizHolder.find(".countDown .spinner")) && e.addClass("spin").removeClass("paused"), this.quizHolder.find(".countDown .time").text(t--), 0 > t ? (null != (n = this.quizHolder.find(".countDown .spinner")) && n.addClass("paused"), this._check_ans()) : (this.count_time += 1, setTimeout(function(e) {
                return function() {
                    return e._count_down(t)
                }
            }(this), 1e3))) : void 0
        }, e.prototype._check_ans = function() {
            var t, e;
            return this.open_to_answer = 0, t = -1, e = this.quizHolder.find(".ans.selected"), this.quizHolder.find(".answers .ans").loop(function(t) {
                var e;
                return e = t.attr("aid"), $.inArray(e, jLang.ans_set) >= 0 ? t.addClass("rightAns") : void 0
            }), this.quizHolder.find(".ans.selected.rightAns").length ? this.count_correct += 1 : this.count_wrong += 1, this.quizHolder.addClass("result"), this._calc_score()
        }, e.prototype._calc_score = function() {
            var t, e, n, r, i, s, o, a;
            return r = this.level, t = this.XP, s = 200, o = r * this.point, this.quizHolder.find(".ans.selected.rightAns").length || (o = -o), a = $(".scorePopout"), n = o > 0 ? "+" + o : o, a.find(".score").text(n), 1 !== this.point_rate && (e = 2 === this.point_rate ? "x2" : "÷2", a.find(".bonus").text(e)), setTimeout(function() {
                return a.removeClass("hide")
            }, s), s += 50, setTimeout(function() {
                return a.addClass("fadeIn")
            }, s), s += 200, 1 !== this.point_rate && setTimeout(function() {
                return a.find(".bonus").addClass("true")
            }, s), s += 500, setTimeout(function() {
                return a.addClass("fadeOut")
            }, s), s += 100, i = o * this.point_rate, this.score_round += i, this.score += i, setTimeout(function(t) {
                return function() {
                    return a.addClass("hide").removeClass("fadeIn fadeOut").find(".bonus").removeClass("true"), t._score_board(i)
                }
            }(this), s), s += 1e3, this.score < 0 ? setTimeout(function(t) {
                return function() {
                    return t._game_over()
                }
            }(this), s) : setTimeout(function(e) {
                return function() {
                    return e.score < 0 ? void 0 : (t++, t < e.max_XP ? (e.XP = t, e._play_level()) : (e.level = r + 1, e.level > e.max_level ? e._game_over() : e.roulette._run()))
                }
            }(this), s)
        }, e.prototype._score_board = function(t) {
            var e, n, r, i, s, o, a, u, d, l;
            return e = 100 * this.max_XP + 900 * this.max_level, u = this.score, s = this.scoreBoard, d = s.find(".score"), i = s.find(".bar"), o = this.level, a = u / e * 100, a > 100 && (a = 100), 0 > a && (a = 0), i.animate({
                width: a + "%"
            }, 300), d.animate({
                left: a + "%"
            }, 300), r = parseInt(d.text()), n = 20 * o, l = function(t) {
                return r += n >= t ? t : n, d.text(r), t -= n, t > 0 ? setTimeout(function() {
                    return l(t)
                }, 50) : void 0
            }, l(t), a > 90 ? s.addClass("high") : s.removeClass("high"), setTimeout(function() {
                return 0 > t && 10 > a ? (s.addClass("danger"), 0 > u ? s.addClass("dead") : void 0) : s.removeClass("danger dead")
            }, 200)
        }, e.prototype._score_board_reset = function() {
            var t, e, n;
            return e = this.scoreBoard, n = e.find(".score"), t = e.find(".bar"), e.removeClass("high danger dead"), n.text(0), t.css("width", 0), n.css("left", 0)
        }, e.prototype._bonus = function(t, e) {
            var n, r, i, s, o;
            switch (o = this.score_round, i = 0, r = 1e3, this.point_rate = 1, this.score_round = 0, this.countdown = 6, this.hint = 0, 0 === t || 3 === t || 4 === t ? e %= 2 : 2 === t && (e %= 3), t) {
                case 0:
                    this.point_rate = 0 === e ? 2 : .5;
                    break;
                case 1:
                    n = {
                        0: 200,
                        1: -200,
                        2: 500,
                        3: -500,
                        4: 800,
                        5: -800
                    }, i = n[e];
                    break;
                case 2:
                    s = {
                        0: .5,
                        1: -.5,
                        2: 1
                    }, i = o * s[e];
                    break;
                case 3:
                    this.countdown = 0 === e ? 2 * this.countdown : this.countdown / 2, this.countdown = Math.ceil(this.countdown);
                    break;
                case 4:
                    this.hint = 0 === e ? this.hint + 1 : this.hint + 2
            }
            return 0 !== i && (this.score_round += i, this.score += i, this._score_board(i), r += 1e3), setTimeout(function(t) {
                return function() {
                    return t.score < 0 ? t._game_over() : t._next_level()
                }
            }(this), r)
        }, e.prototype._game_over = function() {
            return this.leaderBoard.run(this.score, this.count_correct, this.count_wrong, this.count_time, 1)
        }, e
    }(), window.tn.roulette = function() {
        function t(t) {
            null == t && (t = "#section-roulette .roulette"), this.roulette = $(t), this._function_init()
        }
        return t.prototype.roulette = 0, t.prototype.rolling = 0, t.prototype.time_start = 0, t.prototype.elapsed = 0, t.prototype.bonus_type = 0, t.prototype.round = 1, t.prototype.ans = {
            0: ["x2", "÷2", "x2", "÷2", "x2", "÷2"],
            1: ["+200", "-200", "+500", "-500", "+800", "-800"],
            2: ["+50%", "-50%", "+100%", "+50%", "-50%", "+100%"],
            3: ["x2", "÷2", "x2", "÷2", "x2", "÷2"],
            4: ["-1", "-2", "-1", "-2", "-1", "-2"]
        }, t.prototype._function_init = function() {
            var t;
            return t = this.roulette.find(".stop"), t.click(function(t) {
                return function() {
                    var e, n, r;
                    if (t.rolling) return e = r = new Date, n = e.getMilliseconds(), t.elapsed = Math.abs(n - t.time_start), t._stop()
                }
            }(this))
        }, t.prototype._reset = function() {
            return this.round = 1, $("#section-roulette").addClass("hide"), this.roulette.attr("class", "roulette").find(".wheel_1").attr("class", "wheel wheel_1").end().find(".wheel_2").attr("class", "wheel wheel_2").end().find(".selected").removeClass("selected")
        }, t.prototype._run = function(t) {
            var e;
            return null == t && (t = this.round), e = new Date, this.time_start = e.getMilliseconds(), this.elapsed = 0, $("#section-roulette").removeClass("hide").find(".roulette").addClass("rolling"), this.rolling = 1
        }, t.prototype._stop = function(t) {
            var e, n, r, i, s, o, a, u;
            if (null == t && (t = this.round), this.rolling = 0, o = this.elapsed % 6, this.roulette.removeClass("rolling").find(".wheel_" + t + " .slot_" + o).addClass("selected"), s = 500, 1 === t) {
                if (o >= 5) return this._exit(-1);
                for (this.bonus_type = o, setTimeout(function(e) {
                        return function() {
                            return e.roulette.addClass("round_" + t), e.roulette.find(".bonus").fadeIn(300).find(".type_" + o).addClass("selected")
                        }
                    }(this), s), s += 300, setTimeout(function(t) {
                        return function() {
                            return t.roulette.addClass("transiting")
                        }
                    }(this), s), s += 800, e = this.ans[o], u = this.roulette.find(".wheel_2"), r = i = 0; 5 >= i; r = ++i) u.find(".slot_" + r + " .symbol").text(e[r]);
                return setTimeout(function(t) {
                    return function() {
                        return u.addClass("bonus_" + o).addClass("active")
                    }
                }(this), s), s += 100, setTimeout(function(t) {
                    return function() {
                        return t.roulette.removeClass("transiting"), t.round = 2, t._run()
                    }
                }(this), s)
            }
            return n = this.bonus_type, a = this.ans[n][o], setTimeout(function(t) {
                return function() {
                    return t._exit(n, o)
                }
            }(this), s)
        }, t.prototype._exit = function(t) {
            null == t && (t = 0)
        }, t
    }()
}).call(this);