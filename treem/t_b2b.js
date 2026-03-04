// t_b2b.js — база B2B метрик (#b2b)

window.T_B2B = {
  id: "root",
  code: "B2B",
  name: "B2B дерево метрик",
  short: "Корневой уровень: метрики всей системы B2B-продукта — привлечение, ценность, удержание, расширение выручки, надежность и внедрение.",
  why: "B2B почти всегда = длинный цикл сделки, несколько ролей (buyer/admin/user), контракты и продления, сложное внедрение и высокая цена ошибок. Корневой уровень нужен, чтобы связать продуктовые метрики с деньгами (ARR/MRR, GRR/NRR), процессом продаж/внедрения и качеством сервиса: договориться об определениях (что такое «активация», «аккаунт активен», «churn»), выбрать NSM и guardrails, а затем раскладывать причинно‑следственные связи «что улучшили в продукте → как это повлияло на выручку/удержание/затраты».",
  formula: "Нет одной формулы. Это контейнер/таксономия: набор метрик по этапам (acq→sales→activation→adoption→retention→expansion) + правила сегментации (SMB/ENT, индустрии, роли, планы) + связи «причина → следствие» и единые окна/когорты.",
  tags: ["B2B", "SaaS", "NorthStar", "UnitEconomics", "Retention", "Expansion"],
  howImprove: [
    "Четко определить единицу продукта (account/workspace/seat) и единицу ценности (core action/outcome)",
    "Зафиксировать NSM + 3–6 ключевых подметрик и guardrails (надежность, cost-to-serve, качество)",
    "Развести метрики по ролям и этапам: buyer/admin/end-user; pre-sale vs post-sale",
    "Нормализовать сегментацию (SMB vs enterprise) и всегда смотреть метрики в разрезах",
    "Строить «land & expand»: ускорять TTV, повышать seat_util, растить NRR",
    "Привязать фичи к метрикам через гипотезы и заранее описывать ожидаемое изменение"
  ],
  pitfalls: [
    "Смешивать B2B и B2C определения (ориентироваться только на MAU, игнорируя аккаунты/выручку)",
    "Считать «в среднем по больнице» без сегментов, ролей и планов",
    "Подмена ценности активностью (логины, клики вместо outcomes)",
    "Оптимизация верхней воронки ценой качества (падает win_rate, растет churn, NRR/GRR проседают)",
    "«Красивый NRR» за счет повышения цены при падении adoption/CSAT",
    "Несогласованные определения событий/окон и разная трактовка метрик между командами"
  ],
  related: ["arr_new", "acv", "win_rate", "sales_cycle", "act_rate", "ttv", "seat_util", "feat_adopt", "ret30", "logo_churn", "grr", "nrr", "uptime", "mttr", "cts", "payback"],
  children: [
    {
      id: "visits",
      code: "visits",
      name: "Трафик (Visits / Sessions)",
      short: "Кол-во визитов/сессий на сайт/лендинг/доки/продуктовые страницы.",
      why: "База верхней воронки: без стабильного входящего потока сложно интерпретировать конверсию и эффективность каналов. В B2B важно не только количество, но и намерение: посещения high‑intent страниц (pricing, security, docs, integrations) лучше предсказывают лиды и pipeline, чем общий трафик.",
      formula: "Количество сессий за период (по аналитике).",
      tags: ["Acquisition", "Traffic", "TopOfFunnel", "SEO", "PaidMedia", "Attribution"],
      howImprove: [
        "Уточнять ICP и сообщения под сегменты (SMB/ENT, индустрии, роли)",
        "SEO/контент по use-case, интеграциям, сравнениям и проблемным запросам",
        "Платные кампании + ретаргет на high-intent страницы (pricing/security/docs)",
        "Ускорять сайт: скорость, ясные CTA, релевантные страницы под кампании",
        "Размечать UTM/каналы и разделять брендовый/небрендовый трафик"
      ],
      pitfalls: [
        "Смешивать брендовый и небрендовый трафик",
        "Игнорировать качество: «пустые» визиты раздувают метрику",
        "Не отделять high-intent страницы от «инфо» контента",
        "Не фильтровать ботов и спам",
        "Сравнивать периоды без учета сезонности и изменения бюджетов"
      ],
      related: ["signup_cr", "mql", "cpl", "cac"],
      children: [
        { id: "signup_cr", code: "signup_cr", name: "Signup / Lead Conversion Rate", short: "Доля посетителей, оставивших заявку/зарегистрировавшихся.", why: "Показывает, насколько оффер и «первый шаг» понятны и ценны для ICP. В B2B важно смотреть CR отдельно по high-intent страницам и по сегментам, иначе среднее скрывает провалы в ключевых аудиториях.", formula: "Signup CR = signups ÷ visits", tags: ["Conversion", "LandingPage", "LeadGen", "CRO", "Intent", "B2B"], howImprove: ["Упростить форму (меньше полей), SSO, автозаполнение", "Сделать ясный value prop + proof (логотипы, кейсы, цифры) рядом с CTA", "Добавить быстрый путь: demo request, calendar, чат, pricing clarity", "Оптимизировать под каналы: разные лендинги под разные use-case", "Фильтровать спам: captcha, email verify, honeypot"], pitfalls: ["Считать конверсию без разреза по каналам/страницам", "Учитывать ботов/спам-лиды", "Гнать CR вверх ценой качества (падает MQL/SQL)", "Смешивать trial signup и sales lead в одной метрике", "Сравнивать без учета изменений в трафике и оффере"], related: ["cpl", "mql_rate", "pql_rate"] },
        { id: "cpl", code: "cpl", name: "Cost per Lead", short: "Сколько стоит получить 1 лид (заявку/регистрацию).", why: "Быстро показывает эффективность платного привлечения до уровня lead, но в B2B имеет смысл только вместе с качеством (MQL/SQL) и скоростью реакции. Низкий CPL может маскировать дорогой pipeline, если лиды не конвертятся в возможности.", formula: "CPL = marketing_spend ÷ leads", tags: ["PaidAcquisition", "Efficiency", "LeadGen", "CPL", "Pipeline", "B2B"], howImprove: ["Оптимизация креативов/аудиторий/посадочных", "Перенос бюджета в каналы/ключи с высоким intent", "Отключать плейсменты с низким качеством (по MQL/SQL)", "Улучшать lead magnet (демо, калькулятор ROI, чек-лист)", "Синхронизировать SLA обработки лидов (скорость реакции повышает конверсию)"], pitfalls: ["Радоваться низкому CPL при низком качестве", "Считать CPL без учета скрытых расходов (агентство, инструменты)", "Оптимизировать под лиды, а не под SQL/pipeline", "Смешивать сегменты и рынки в одном CPL", "Сравнивать периоды без учета сезонности и изменений ставок"], related: ["mql_rate", "sql_rate", "cac"] },
        { id: "mql", code: "mql", name: "MQL", short: "Лиды, которые соответствуют базовым критериям (ICP, intent).", why: "Отсекает «шум» и связывает маркетинг с продажами: MQL должен отражать реальный потенциал сделки (fit + intent). В B2B это снижает нагрузку на sales и повышает win rate, если критерии калиброваны совместно.", formula: "Количество лидов, прошедших MQL-критерии.", tags: ["Marketing", "Qualification", "ICP", "Intent", "LeadScoring", "B2B"], howImprove: ["Четкие правила MQL (индустрия, размер, роль, intent-сигналы)", "Lead scoring + enrichment (firmographics/technographics)", "Контент под mid-funnel (кейсы, вебинары, сравнения)", "Скоростной routing: кому и когда уходит MQL (SLA)", "Регулярная обратная связь от sales по качеству и причинам отказа"], pitfalls: ["Слишком «широкий» MQL → конфликт с sales", "Менять критерии без фиксации версий и сравнимости", "Считать MQL количеством, а не вкладом в pipeline", "Игнорировать сегменты: у SMB/ENT разные пороги", "Дубли/спам и неверная атрибуция источника"], related: ["sql", "mql_rate", "win_rate"] }
      ]
    },
    {
      id: "sales_eff",
      code: "sales_eff",
      name: "Эффективность продаж (Sales Efficiency/Velocity)",
      short: "Насколько быстро и предсказуемо воронка превращает спрос/возможности в новую выручку, сочетая вероятность победы, размер сделки и скорость цикла.",
      why: "Это «зонт» для метрик win_rate, sales_cycle, acv: помогает одновременно видеть качество ICP/позиционирования, эффективность процесса продаж и экономический результат. Удобно для управления ростом и прогнозирования: где узкое место — выигрываем реже, продаём дольше или чек маловат.",
      formula: "Вариант композитной метрики (Sales Velocity): sales_vel = opp_count × win_rate × acv / sales_cycle. Где opp_count — число активных возможностей (opportunities) за период, sales_cycle — средняя/медианная длительность цикла (в днях), acv — средняя годовая стоимость контракта.",
      tags: ["Sales", "SalesVelocity", "Pipeline", "WinRate", "ACV", "SalesCycle"],
      howImprove: [
        "Улучшать win_rate: точнее ICP, сильнее демо/ROI-кейсы, лучше qualification (MQL→SQL)",
        "Сокращать sales_cycle: security/procurement kit, шаблон POC с критериями успеха, быстрые ответы",
        "Повышать ACV: упаковка тарифов и add-ons, value-based pricing, upsell на SLA/безопасность",
        "Увеличивать opp_count без потери качества: фокус на high-intent каналы и сегменты",
        "Сегментировать отчеты (SMB/ENT/индустрии) и управлять метриками отдельно"
      ],
      pitfalls: [
        "Смешивать сегменты (SMB и Enterprise) — средние значения становятся бессмысленными",
        "Рост opp_count низкого качества → падает win_rate и растёт sales_cycle",
        "Манипуляции стадиями/датами в CRM (искажает velocity)",
        "Считать только среднее — игнорировать медиану и распределение по стадиям",
        "Гнаться за ACV ценой retention (важно параллельно следить за GRR/NRR)"
      ],
      related: ["win_rate", "sales_cycle", "acv", "opp_count", "arr_new", "cac", "payback"],
      children: [
        { id: "sql", code: "sql", name: "SQL", short: "Лиды, подтвержденные sales (есть потребность/бюджет/сроки).", why: "Показывает, сколько лидов реально «годятся» для продаж и превращаются в работу в CRM. SQL — точка, где качество маркетинга встречается с дисциплиной sales: скорость реакции, корректный discovery и единые критерии сильно влияют на конверсию в opportunity.", formula: "Количество лидов, принятых в работу sales.", tags: ["Sales", "Qualification", "Pipeline", "SLA", "Discovery", "B2B"], howImprove: ["Совместная калибровка критериев MQL→SQL", "Быстрый SLA реакции на MQL и прозрачный routing", "Playbooks по индустриям и типовым болям", "Шаблоны discovery/qualification (MEDDICC/BANT как ориентир)", "Обратная связь: причины disqualify возвращать в маркетинг"], pitfalls: ["Разные определения SQL у команд", "Принятие в SQL «ради плана» без реального fit", "Считать SQL без контроля дубликатов и источников", "Не фиксировать причины отказа/потери", "Смешивать inbound и outbound в одной метрике без разреза"], related: ["mql", "sales_cycle", "win_rate", "cac"] },
        { id: "win_rate", code: "win_rate", name: "Win Rate", short: "Доля закрытых «won» сделок из всех закрытых.", why: "Показывает силу продукта/позиционирования/прайсинга и качество ICP. В B2B win rate сильно зависит от сегмента и стадии воронки, поэтому важно измерять его отдельно по SMB/ENT, каналам и причинам проигрыша.", formula: "Win rate = deals_won ÷ (deals_won + deals_lost)", tags: ["Sales", "Conversion", "Pipeline", "ICP", "Pricing", "B2B"], howImprove: ["Уточнить ICP и отказываться от «не своих» сегментов", "Улучшить демо-сценарии и доказательства ценности (кейсы/ROI)", "Сильнее qualification на ранних стадиях (меньше мусорных opp)", "Закрывать типовые objections: security, интеграции, комплаенс", "Анализировать loss reasons и адресовать топ-3 продуктом/контентом"], pitfalls: ["Считать без разреза по сегментам/каналам/причинам проигрыша", "Игнорировать размер выборки (малые числа дают шум)", "Смешивать стадии (SQL→won и opp→won) без ясного определения", "Подгонять процесс под метрику (закрывать как lost слишком поздно/рано)", "Не учитывать конкурентное окружение и изменения цен"], related: ["sales_cycle", "acv", "nrr"] },
        { id: "sales_cycle", code: "sales_cycle", name: "Длина цикла сделки", short: "Среднее время от первого контакта до подписания.", why: "Влияет на кэш-флоу, прогнозирование и CAC payback: чем длиннее цикл, тем больше капитала «заморожено». В B2B цикл часто определяется не продуктом, а procurement/security, поэтому важно видеть, на каком шаге сделки «застревают».", formula: "avg(close_date − first_touch_date)", tags: ["Sales", "CycleTime", "Procurement", "Forecasting", "CACPayback", "B2B"], howImprove: ["Упростить procurement/security (готовые ответы, SOC2/ISO материалы)", "POC-шаблоны и критерии успеха + таймбокс", "Ускорять следующий шаг: календарь, follow-up, owner на стадии", "Self-serve/PLG путь для SMB, чтобы укорачивать цикл", "Разбирать bottlenecks по стадиям (stage duration) и устранять"], pitfalls: ["Смешивать enterprise и SMB в одной средней", "Считать только среднее, игнорируя медиану и хвост", "Манипулировать стадиями и датами ради отчета", "Не фиксировать start point (первый контакт? MQL? SQL?)", "Сравнивать циклы без учета изменений ICP и рынка"], related: ["cac", "payback", "win_rate"] },
        { id: "acv", code: "acv", name: "Average Contract Value", short: "Средний размер годового контракта (или среднего чека).", why: "Определяет экономику: допустимый CAC, приоритет сегментов и темп роста. Важно понимать структуру ACV (база + add-ons + usage) и отдельно смотреть new vs expansion, иначе можно «раздуть» ACV и ухудшить удержание.", formula: "ACV = total_contract_value ÷ #contracts", tags: ["Revenue", "ACV", "Pricing", "Packaging", "Sales", "B2B"], howImprove: ["Упаковка планов (tiers), add-ons, usage-based компоненты", "Value-based pricing и ограничители, которые стимулируют расширение", "Upsell на безопасность, админ-функции, SLA", "Точная сегментация оффера (SMB vs ENT) и bundle по индустриям", "Снижать discount через доказательства ценности (ROI/кейсы)"], pitfalls: ["Путать ACV с «первым инвойсом» или неполным годом", "Считать средний ACV без распределения (есть «киты»)", "Рост ACV ценой падения win rate", "Не отделять booked от recognized и базу от usage", "Перекладывать рост на скидки (ACV номинально растет, маржа падает)"], related: ["arr_new", "cac", "nrr"] }
      ]
    },
    {
      id: "act_section",
      code: "ACT",
      name: "Активация и онбординг (Act / Onb)",
      short: "Доведение новых аккаунтов до момента ценности: настройка, интеграции, первый результат, готовность к регулярному использованию.",
      why: "В B2B активация — главный предиктор retention/NRR. Если клиент не дошёл до value и не настроил базовые зависимости (права/данные/интеграции), он почти всегда «сгорает» на trial/первых неделях и не расширяется.",
      formula: "Нет одной формулы. Секция = набор метрик «скорость/успешность настройки → первый outcome».",
      howImprove: [
        "Зафиксировать activation/outcome по use-case и ролям (admin vs user), плюс окно (например, 7/14 дней)",
        "Сократить TTV: шаблоны, sample data, авто-настройка, «happy path» без лишних шагов",
        "Развести онбординг по ролям: отдельный путь для admin setup и end-user quick start",
        "Подсветить блокеры: валидаторы, test connection, понятные ошибки, self-serve troubleshooting",
        "Триггерить помощь при застревании на шаге (in-app подсказки, чат, CS playbooks)"
      ],
      pitfalls: [
        "Считать активацией логин/клик вместо результата (outcome)",
        "Один онбординг/activation для всех сегментов и ролей (среднее скрывает провалы)",
        "Игнорировать «setup reliability»: ошибки интеграций маскируются, TTV растёт",
        "Мерить среднее время вместо медианы и хвоста (p95) — не видно «застрявших»"
      ],
      related: ["act_rate", "ttv", "onb_comp", "setup_sr", "pql"],
      tags: ["Activation", "Onboarding", "TimeToValue", "Setup", "PLG", "B2B"],
      children: [
        { id: "act_rate", code: "act_rate", name: "Доля активировавшихся", short: "Доля новых аккаунтов, достигших «момента ценности» (Aha/Activation).", why: "В B2B это главный предиктор retention/expansion: активация фиксирует, что клиент не просто «создал аккаунт», а получил первый ощутимый результат. Сильнее всего работает, когда activation-событие привязано к use-case и роли (admin vs user).", formula: "act_rate = activated_accounts ÷ new_accounts", tags: ["Activation", "AhaMoment", "Onboarding", "Cohorts", "Retention", "B2B"], howImprove: ["Ясно определить activation-событие (по use-case/сегментам)", "Guided onboarding: шаблоны, sample data, подсказки по шагам", "Сократить путь до activation: меньше шагов, меньше ожиданий, авто-настройка", "Ролевые пути: отдельный happy-path для admin setup и end-user", "Триггеры помощи: чат/подсказки при застревании на шаге"], pitfalls: ["Считать активацией «логин» вместо реальной ценности", "Один activation на всех сегментов и ролей", "Не фиксировать окно (за сколько дней должна случиться активация)", "Поднимать act_rate за счет снижения требований к событию", "Не учитывать, что активация может быть командной (несколько ролей)"], related: ["ttv", "d7", "ret30"] },
        { id: "ttv", code: "ttv", name: "Time to Value (TTV)", short: "Сколько времени проходит от старта (signup/оплата) до получения «первой ценности».", why: "Чем быстрее ценность — тем выше конверсия trial→paid и удержание. В B2B TTV часто упирается в настройку, интеграции и согласования, поэтому важно измерять медиану и причины задержек по шагам онбординга.", formula: "median(time_of_first_value − signup_time)", tags: ["TimeToValue", "Onboarding", "Activation", "Setup", "Trial", "B2B"], howImprove: ["Убрать «пустые» шаги, сделать быстрый happy-path", "Авто-настройка, импорты, интеграции в 1 клик", "Ролевые шаблоны (для admin/user) и готовые пресеты", "Показать «первую ценность» даже без полной настройки (sample data)", "Инструменты диагностики: test connection, валидаторы, подсказки"], pitfalls: ["Один TTV на всех: в B2B разные сегменты имеют разный value", "Считать среднее вместо медианы (хвост искажает)", "Не фиксировать стартовую точку (signup? payment? first login?)", "Подменять ценность «первым действием» без outcome", "Игнорировать блокеры вне продукта (security/procurement)"], related: ["act_rate", "trial2paid", "ret30"] },
        { id: "onb_comp", code: "onb_comp", name: "Завершение онбординга", short: "Доля аккаунтов, прошедших ключевые шаги настройки (checklist).", why: "Проксирует готовность к регулярному использованию: показывает, дошёл ли аккаунт до «минимально рабочего» состояния (данные подключены, роли настроены, первый результат получен). В B2B завершение чек-листа полезно, когда шаги действительно коррелируют с retention.", formula: "completed_onboarding ÷ started_onboarding", tags: ["Onboarding", "Setup", "Checklist", "Activation", "Cohorts", "B2B"], howImprove: ["Сделать чек-лист коротким и привязанным к value (не к фичам)", "Показывать прогресс, time estimate и «следующий лучший шаг»", "Развести пути admin setup и end-user quick start", "Добавить шаблоны/пресеты и sample data для быстрого старта", "Триггерить помощь при застревании на шаге (чат, подсказки, call)"], pitfalls: ["Онбординг «ради галочки», не связанный с ценностью", "Слишком длинный чек-лист → люди бросают", "Единый путь для всех ролей и сегментов", "Считать completion без окна времени (через год тоже «завершил»)" , "Поднимать completion упрощением шагов, которые не дают ценности"], related: ["ttv", "act_rate", "seat_util"] },
        { id: "setup_sr", code: "setup_sr", name: "Успешность настройки", short: "Доля попыток настройки (интеграция/импорт/конфиг), завершившихся успехом.", why: "В B2B «сломанный» setup убивает активацию и поднимает стоимость поддержки: клиент тратит время, зовёт инженеров/админа и теряет доверие. Метрика помогает находить самые проблемные интеграции/шаги и улучшать диагностику.", formula: "setup_success ÷ setup_attempts", tags: ["Setup", "Integrations", "Reliability", "Onboarding", "Diagnostics", "B2B"], howImprove: ["Валидаторы, понятные ошибки, self-healing", "Диагностика (проверка прав, токенов, сетей)", "Test connection и sandbox-режим", "Логи/трейсы для клиента и support (чтобы быстрее чинить)", "Документация «по симптомам», а не по фичам"], pitfalls: ["Не считать частичные успехи/повторные попытки", "Скрывать ошибки ретраями без объяснения причин", "Смешивать разные типы setup (SSO vs импорт) в одной цифре", "Не учитывать время до успеха (может быть «успешно», но через 3 дня)", "Игнорировать сегменты (enterprise сложнее, чем SMB)"], related: ["ttv", "tickets_rate", "act_rate"] },
        { id: "pql", code: "pql", name: "PQL", short: "Лиды, квалифицированные продуктовым поведением (достигли meaningful usage в trial/freemium).", why: "Сдвигает фокус с «кто заполнил форму» на «кто реально почувствовал ценность». В PLG PQL помогает sales/CS вовремя подключаться к аккаунтам, которые уже доказали fit, и повышает конверсию в оплату.", formula: "Количество trial/freemium аккаунтов, прошедших PQL-порог.", tags: ["PLG", "PQL", "ProductQualified", "Trial", "Activation", "B2B"], howImprove: ["Определить PQL-сигналы: активация, использование ключевой фичи, приглашения", "Сегментные пороги: SMB vs ENT, разные use-case", "Триггерные сообщения sales/CS по достижению порога", "Сократить путь до PQL (templates, guided)", "Проверять качество PQL по конверсии PQL→paid и win rate"], pitfalls: ["Порог слишком низкий → много ложных PQL", "Порог слишком высокий → упускаем момент контакта", "Считать PQL без учета ролей (admin vs user)", "Смешивать self-serve и sales-led путь", "Не пересматривать сигналы при изменении продукта/прайсинга"], related: ["act_rate", "trial2paid", "ttv"] }
      ]
    },
    {
      id: "eng_section",
      code: "ENG",
      name: "Использование (Engagement / Adoption)",
      short: "Регулярность и глубина использования: активные аккаунты, частота core действий, adoption ключевых фич, утилизация seats.",
      why: "В B2B «использование» должно быть привязано к аккаунту/ролям и outcomes. Иначе можно радоваться WAU/MAU, пока value не достигается, seats не внедряются, а renewals под риском.",
      formula: "Нет одной формулы. Секция = «meaningful usage» на уровне аккаунта + роли + core actions.",
      howImprove: [
        "Определить «активность» через core action/outcome и минимальную частоту (weekly/daily по workflow)",
        "Сегментировать usage по ролям (admin vs end-user) и по источнику (trial vs paid)",
        "Встроить фичи в основной workflow и усилить discoverability (empty states, подсказки, шаблоны)",
        "Упростить core flow (шорткаты, автозаполнение, bulk, API/automation)",
        "Поддерживать seat adoption: приглашения, роли/permissions presets, админ-отчёты по неактивным seats"
      ],
      pitfalls: [
        "Подмена ценности активностью (логины, просмотры вместо meaningful usage)",
        "Смешивание сегментов/ролей: «средняя» активность ничего не говорит",
        "«Накрутка» usage автоматизацией/ботами без контроля источника",
        "Считать только среднее, игнорируя распределение (power users vs нулевые)"
      ],
      related: ["aa", "wau", "stick", "feat_adopt", "core_freq", "seat_util"],
      tags: ["Engagement", "Adoption"],
      children: [
        { id: "aa", code: "aa", name: "Активные аккаунты", short: "Кол-во аккаунтов, проявивших «активность» за период.", why: "В B2B единица ценности часто «аккаунт», а не пользователь.", formula: "count(distinct account_id with activity_event)", tags: ["Engagement", "Accounts", "Usage"], howImprove: [
          "Улучшать активацию и первичные use-case",
          "Продуктовые напоминания/дайджесты для возвращения",
          "Улучшать совместную работу (collab) внутри аккаунта",
          "Определить «активность» через core action/outcome и минимальную частоту (например, ≥N событий/неделю)"
        ], pitfalls: [
          "Слабое определение activity → метрика размыта",
          "Считать активность без окна и частоты (раз в месяц ≠ регулярное использование)",
          "Не разделять источники активности (ручная работа vs автопроцессы/API)",
          "Смешивать trial и paying аккаунты — теряется сигнал про удержание"
        ], related: ["wau", "ret30", "seat_util"] },
        { id: "wau", code: "wau", name: "Weekly/Monthly Active Users", short: "Количество активных уникальных пользователей за неделю/месяц.", why: "Понимание масштаба регулярного использования и «привычки».", formula: "count(distinct user_id with activity in period)", tags: ["Engagement", "Active", "Cohorts"], howImprove: [
          "Ритуалы: weekly reports, scheduled jobs, alerts",
          "Сделать продукт daily/weekly workflow tool",
          "Улучшать производительность и UX ключевых экранов",
          "Развести события по ролям (admin vs end-user) и считать отдельные WAU/MAU для ключевых ролей"
        ], pitfalls: [
          "Сравнивать WAU разных ролей (admin vs end user) без сегментации",
          "Считать WAU/MAU без разреза по источнику (trial vs paid, inbound vs outbound)",
          "Смешивать «читателей» и «создателей» (viewer vs editor роли дают разную ценность)",
          "Игнорировать аккаунтный уровень: много юзеров в одном аккаунте могут скрыть churn других"
        ], related: ["stickiness", "ret30", "adopt_rate"] },
        { id: "stick", code: "stick", name: "Липкость (Stickiness)", short: "Частота использования: DAU/MAU (или WAU/MAU в B2B).", why: "Быстро показывает, стал ли продукт частью рутины.", formula: "stick = wau ÷ mau (или dau ÷ mau)", tags: ["Engagement", "Habit", "Usage"], howImprove: [
          "Триггерить «поводы вернуться» (алерты, задачи, отчёты)",
          "Улучшить скорость выполнения ключевого сценария",
          "Интеграции, чтобы продукт был в центре процесса",
          "Считать липкость по сегментам и «правильному» горизонту (WAU/MAU для weekly-workflow продуктов)"
        ], pitfalls: [
          "Высокая stickiness может быть из-за «боли/фрикции»",
          "Высокая stickiness из-за обязательных рутин/комплаенса — не значит удовлетворенность",
          "Сравнивать stickiness между сегментами с разной частотой работы (daily vs weekly процессы)",
          "Оптимизировать метрику уведомлениями/спамом и ухудшать опыт"
        ], related: ["ces", "nps", "tickets_rate"] },
        { id: "feat_adopt", code: "feat_adopt", name: "Доля использования фичи", short: "Доля активных пользователей/аккаунтов, регулярно использующих конкретную фичу.", why: "Понимание, какие фичи реально создают ценность и удерживают.", formula: "feature_active ÷ total_active × 100%", tags: ["Adoption", "Features", "Engagement", "Value"], howImprove: [
          "Улучшить discoverability (подсказки, пустые состояния)",
          "Встроить фичу в основной workflow",
          "Обучение: 1-мин демо, шаблоны, try it",
          "Сделать enablement: роликовые подсказки/встроенные туториалы + материалы для админа/чемпиона"
        ], pitfalls: [
          "Путать «пробовал 1 раз» и «регулярно применяет»",
          "Считать adoption по всем, хотя фича релевантна только части ICP",
          "Не учитывать time-to-adopt (важно, за сколько дней после активации начинают пользоваться)",
          "Путать «включил настройку» и «получил результат» (outcome)"
        ], related: ["act_rate", "ret30", "nrr"] },
        { id: "core_freq", code: "core_freq", name: "Частота ключевого действия", short: "Сколько раз за период выполняется ключевое действие (per user/account).", why: "Лучше, чем «активность вообще»: ближе к ценности.", formula: "avg(core_events per account per week)", tags: ["Value", "Core", "Usage", "Workflow"], howImprove: [
          "Сократить шаги до core action",
          "Автоматизация (bulk, templates, API)",
          "Улучшить качество результата core action",
          "Сделать быстрые шорткаты/автодополнения и убрать повторяющуюся ручную работу в core flow"
        ], pitfalls: [
          "«Накручивается» автоматическими процессами/ботами",
          "Оптимизировать частоту, ухудшая качество результата (быстро, но плохо)",
          "Не отделять ручные действия от автоматических (scheduler/API)",
          "Считать только среднее, игнорируя распределение (power users vs нулевые)"
        ], related: ["ttv", "ret30", "nps"] },
        { id: "seat_util", code: "seat_util", name: "Утилизация мест (Seat utilization)", short: "Доля занятых/активно используемых мест из купленных seats.", why: "Прямая связь с расширением: если seats реально используются — легче upsell.", formula: "active_seats ÷ purchased_seats", tags: ["B2B", "Seats", "Adoption", "Expansion"], howImprove: [
          "Team-onboarding: приглашения, роли, permissions presets",
          "Встроенные collab механики (mentions, shared dashboards)",
          "Напоминания admin о незадействованных местах",
          "Добавить отчеты и подсказки для админа: кто не активен, кого пригласить, какие роли/права мешают"
        ], pitfalls: [
          "Активный seat ≠ ценность (может «логин раз в месяц»)",
          "Не различать purchased_seats и provisioned_seats (выдали, но не купили / наоборот)",
          "Не учитывать роли: активность только админа не означает командное внедрение",
          "Считать активным seat по «любому логину», не требуя meaningful usage"
        ], related: ["nrr", "expansion", "ret30"] }
      ]
    },
    {
      id: "ret_section",
      code: "RET",
      name: "Удержание (Retention)",
      short: "Удержание клиентов и выручки: D7/30/90, logo churn, revenue churn, GRR/NRR — здоровье базы и прогноз renewals.",
      why: "Retention в B2B = деньги в будущем. Важно разделять logo vs revenue, смотреть по сегментам и связывать провалы с активацией/адопшеном и качеством сервиса.",
      formula: "Нет одной формулы. Ключевые: churn/GRR/NRR считаются по когорте и периоду.",
      howImprove: [
        "Вести retention/GRR/NRR по сегментам (SMB/ENT), планам, индустриям и ролям",
        "Привязать retention к meaningful usage (core actions), а не к «присутствию»",
        "Ввести health score на аккаунт (usage + support + incidents) и превентивные CS playbooks",
        "Фиксировать причины churn/contraction (категории + текст) и закрывать топ-причины",
        "Ускорять «вторую/третью ценность» после активации (use-case expansion)"
      ],
      pitfalls: [
        "Прятать churn за expansion (NRR красивый, GRR падает)",
        "Смешивать churned и contraction; считать «одной цифрой»",
        "Неверное окно (D7 для weekly-workflow продуктов вводит в заблуждение)",
        "Не отделять новые и расширенные аккаунты (expansion маскирует отток базы)"
      ],
      related: ["d7", "ret30", "logo_churn", "rev_churn", "grr", "nrr"],
      tags: ["Retention", "Cohorts"],
      children: [
        { id: "d7", code: "d7", name: "Retention D7 (аккаунт/пользователь)", short: "Доля пользователей/аккаунтов, вернувшихся на 7-й день (или в 7-дневное окно).", why: "Ранний индикатор «закрепления» после онбординга.", formula: "returned_in_7d ÷ activated (или ÷ new)", tags: ["Retention", "Cohorts", "D7", "Activation"], howImprove: [
          "Сократить ttv, усилить «вторую ценность» на D2–D5",
          "Авто-напоминания по результатам (alerts, weekly digest)",
          "Улучшить обучение по второму сценарию",
          "Привязать «возврат» к core action (а не к логину) и измерять по аккаунтам там, где решение коллективное"
        ], pitfalls: [
          "В enterprise продукт используют реже — D7 может быть не тем окном",
          "Считать D7 по пользователям, когда решение принимается на уровне аккаунта",
          "Не фиксировать событие «вернулся» (login vs core action)",
          "Сравнивать когорты без учета изменений онбординга/триала/коммуникаций"
        ], related: ["ttv", "wau", "ret30"] },
        { id: "ret30", code: "ret30", name: "Retention 30/90", short: "Доля аккаунтов, активных через 30/90 дней.", why: "Ближе к реальной «живучести» B2B подписки.", formula: "active_accounts_at_day30 ÷ cohort_accounts", tags: ["Retention", "Accounts", "Cohorts", "SaaS"], howImprove: [
          "CS-плейбуки, регулярные value reviews",
          "Глубокая интеграция в процессы (API, SSO, policies)",
          "Улучшать «второй» и «третий» use-case",
          "Считать retention по meaningful usage и учитывать рабочую частоту сегмента (weekly vs daily процессы)"
        ], pitfalls: [
          "Не делить на сегменты (SMB vs enterprise)",
          "Считать «активность» слишком слабым событием и получать ложный retention",
          "Игнорировать окно использования (weekly продукт ≠ daily) и выбирать неверный горизонт",
          "Не отделять новые и расширенные аккаунты (expansion может маскировать отток базы)"
        ], related: ["grr", "nrr", "tickets_rate"] },
        { id: "logo_churn", code: "logo_churn", name: "Клиентский churn (Logo churn)", short: "Доля клиентов, ушедших за период.", why: "В B2B «минус клиент» часто означает потерю долгих будущих платежей и рефералов.", formula: "logo_churn = churned_customers ÷ customers_start", tags: ["Churn", "Retention", "Accounts", "Risk"], howImprove: [
          "Early-warning: падение usage/seat_util/CSAT",
          "QBR, успех-планы (success plans) на аккаунт",
          "Устранить top-reasons churn",
          "Фиксировать причины churn (категории + текст) и связывать их с usage/инцидентами/реневалами"
        ], pitfalls: [
          "Смешивать voluntary churn и involuntary (billing/procurement)",
          "Считать churn без причин (voluntary vs involuntary) — трудно лечить",
          "Игнорировать churn «внутри компании» (смена департамента/чемпиона)",
          "Не учитывать когорты по дате внедрения/первой ценности (TTV)"
        ], related: ["rev_churn", "grr", "nrr"] },
        { id: "rev_churn", code: "rev_churn", name: "Выручечный churn (Revenue churn)", short: "Потерянная MRR/ARR из-за отмен/даунгрейдов.", why: "В B2B важнее «сколько денег потеряли», чем «сколько логотипов».", formula: "(lost_mrr + contraction_mrr) ÷ starting_mrr", tags: ["Revenue", "Churn", "SaaS", "Retention"], howImprove: [
          "Пакеты и ограничения, которые стимулируют рост, а не уход",
          "Save plays до downgrade/cancel",
          "Повышать feat_adopt ключевых value-фич",
          "Разделять churned vs contraction и запускать save-plays по ранним сигналам (падение usage/seat_util)"
        ], pitfalls: [
          "Путать contraction и churn",
          "Смешивать churned MRR и contraction MRR — теряется механизм потерь",
          "Считать по invoice/booking без нормализации (annual vs monthly)",
          "Не учитывать валюту/прайс‑эффекты (price increase vs usage drop)"
        ], related: ["grr", "nrr", "expansion"] },
        { id: "grr", code: "grr", name: "GRR (Gross Revenue Retention)", short: "Сколько базовой выручки от существующих клиентов удержали, без учета расширения.", why: "«Качество удержания» без косметики upsell — фундамент здоровья бизнеса.", formula: "GRR = (Starting MRR − churned MRR − contraction MRR) ÷ Starting MRR", tags: ["GRR", "Retention", "Revenue", "SaaS"], howImprove: [
          "Стабильность продукта (меньше инцидентов), улучшение support",
          "Устранение причин downgrade (роль, ограничения, UX)",
          "Программы adoption для ключевых фич",
          "Делать health score на аккаунт (usage + support + инциденты) и работать превентивно до renewal"
        ], pitfalls: [
          "Прятать churn за expansion (поэтому GRR и нужен отдельно)",
          "Считать GRR по выручке без учета credit/возвратов и корректировок",
          "Игнорировать downgrades, которые происходят при renewal (а не внутри периода)",
          "Смешивать сегменты с разной маржой и cost-to-serve"
        ], related: ["logo_churn", "rev_churn", "nrr"] },
        { id: "nrr", code: "nrr", name: "NRR (Net Revenue Retention)", short: "Сколько выручки от существующей базы осталось с учетом расширения.", why: "Главный индикатор здоровья B2B SaaS: можно ли расти «внутри базы».", formula: "NRR = (Starting MRR + expansion MRR − churned MRR − contraction MRR) ÷ Starting MRR", tags: ["NRR", "Expansion", "Revenue", "SaaS"], howImprove: [
          "Увеличивать seat_util и расширять use-case",
          "Add-ons (security, analytics, SLA), usage-based",
          "Customer success: roadmap-fit, QBR, обучение",
          "Отдельно трекать expansion по механикам (seats/usage/add-ons/price) и усиливать те, что дают value"
        ], pitfalls: [
          "Рост NRR за счет price increase при падающем CSAT/usage",
          "NRR выглядит отлично из‑за крупных upsell у пары «китов» — нужен разрез распределения",
          "Игнорировать ранние сигналы: падение adoption/seat_util заранее предсказывает будущий churn",
          "Считать NRR без отделения expansion от price uplift (рост цены ≠ рост ценности)"
        ], related: ["grr", "expansion", "seat_util", "nps"] }
      ]
    },
    {
      id: "mon_section",
      code: "MON",
      name: "Монетизация (Revenue)",
      short: "Экономика роста: новая выручка, конверсия в оплату, ARPA, CAC, payback, LTV и соотношение LTV:CAC.",
      why: "В B2B деньги приходят с лагом и зависят от сегмента/цикла сделки/маржи. Без связки с gross margin и payback легко масштабировать «не ту» воронку и попасть в кассовый разрыв.",
      formula: "Нет одной формулы. Секция = набор юнит-экономики (лучше считать на валовой прибыли).",
      howImprove: [
        "Развести метрики по источникам (self-serve vs sales-led) и по сегментам (SMB/ENT)",
        "Считать CAC/Payback с учетом лага до выручки и gross margin (fully loaded costs)",
        "Оптимизировать trial→paid через «момент ценности» (PQL/activation), а не таймер",
        "Управлять ARPA через value-based packaging, add-ons, usage/seat expansion (без ущерба adoption)",
        "Валидировать LTV на реальных когортах удержания (GRR/NRR), не на «теории»"
      ],
      pitfalls: [
        "Считать по выручке вместо валовой прибыли (ошибка в payback/LTV)",
        "Смешивать booked и recognized revenue; annual vs monthly без нормализации",
        "Радоваться росту ARPA из-за price uplift при падении usage → будущий churn",
        "Считать LTV:CAC без учета срока payback (может убить cashflow)"
      ],
      related: ["arr_new", "trial2paid", "arpa", "cac", "payback", "ltv", "ltv_cac"],
      tags: ["Revenue", "UnitEconomics"],
      children: [
        { id: "arr_new", code: "arr_new", name: "New ARR / New MRR", short: "Выручка от новых клиентов за период.", why: "Понимание «нового роста» отдельно от расширения.", formula: "sum(new_contract_recurring)", tags: ["Revenue", "ARR", "Growth", "New"], howImprove: [
          "Увеличивать win_rate, сокращать sales_cycle",
          "Упрощать self-serve (если применимо)",
          "Увеличивать PQL→paid",
          "Развести метрику на booked vs recognized и вести источник (self-serve, sales-led) отдельно"
        ], pitfalls: [
          "Путать booked ARR и recognized revenue",
          "Считать new ARR без учета churn в том же периоде (иллюзия роста)",
          "Смешивать self-serve и sales-led источники — разные сроки признания выручки",
          "Не учитывать discount/длительность контракта (multi-year)"
        ], related: ["cac", "acv", "trial2paid"] },
        { id: "trial2paid", code: "trial2paid", name: "Trial → Paid conversion", short: "Доля trial-аккаунтов, перешедших на платный план.", why: "Ключевая метрика PLG/self-serve и качества онбординга.", formula: "paid_from_trial ÷ trial_started", tags: ["PLG", "Trial", "Conversion", "Revenue"], howImprove: [
          "Подвести к value до окончания trial (ttv, act_rate)",
          "Paywall/upgrade моменты в «правильных» точках",
          "Коммуникации: подсказки, nurture, сравнение планов",
          "Встроить upgrade-момент в точку ценности (после достижения PQL/activation), а не «по таймеру»"
        ], pitfalls: [
          "Длинный trial может улучшить conversion, но ухудшить cashflow",
          "Считать conversion без учета сегмента и use-case (у enterprise другие сроки)",
          "Оптимизировать на конверсию, ломая активацию (быстрый upsell до value)",
          "Не учитывать touchpoints sales/CS в trial — метрика становится нечестной"
        ], related: ["ttv", "pql", "cac"] },
        { id: "arpa", code: "arpa", name: "ARPA (Average Revenue per Account)", short: "Средняя MRR/ARR на 1 аккаунт.", why: "Основа для LTV, сегментации, прайсинга.", formula: "ARPA = total_MRR ÷ #paying_accounts", tags: ["Revenue", "ARPA", "Pricing", "Segments"], howImprove: [
          "Прайсинг по ценности, tiers, add-ons",
          "Расширение seats/usage",
          "Удержание и апсейл",
          "Разводить ARPA по сегментам/планам и отдельно считать new vs existing, чтобы видеть эффекты прайсинга"
        ], pitfalls: [
          "Средняя скрывает «китов» — нужен разрез по сегментам",
          "ARPA растет из‑за price uplift при падении usage — риск будущего churn",
          "Смешивать monthly и annual без нормализации",
          "Игнорировать распределение (median/percentiles) и «китов»"
        ], related: ["ltv", "nrr", "acv"] },
        { id: "cac", code: "cac", name: "CAC (Customer Acquisition Cost)", short: "Средние расходы sales+marketing на 1 нового клиента.", why: "Сердце юнит-экономики: допустимый рост и прибыльность.", formula: "CAC = (sales_costs + marketing_costs) ÷ new_customers", tags: ["CAC", "UnitEconomics", "Sales", "Marketing"], howImprove: [
          "Увеличивать win_rate, повышать качество MQL/SQL",
          "Ускорять sales_cycle (procurement kit)",
          "Развивать PLG/рефералы/контент",
          "Считать CAC по когортам и учитывать лаг до выручки (по SQL/closed-won датам)"
        ], pitfalls: [
          "Не включать fully loaded расходы (зарплаты, инструменты)",
          "Считать CAC без учета времени: расходы сейчас, выручка позже (лаг цикла сделки)",
          "Не разделять CAC по сегментам/каналам — нельзя оптимизировать бюджет",
          "Игнорировать cost-to-serve и gross margin — payback будет неверным"
        ], related: ["payback", "ltv", "cpl"] },
        { id: "payback", code: "payback", name: "CAC Payback Period", short: "Сколько месяцев нужно, чтобы валовая прибыль от клиента окупила CAC.", why: "В B2B показывает «сколько капитала сжигаем» и как быстро он возвращается.", formula: "Payback = CAC ÷ (new_MRR × gross_margin)", tags: ["Payback", "CAC", "Finance", "Efficiency"], howImprove: [
          "Поднимать gross margin, снижать cost-to-serve",
          "Повышать ARPA/ACV и конверсию",
          "Снижать CAC через каналы с лучшим intent",
          "Считать payback на валовой прибыли с учетом ramp-up и реального профиля платежей по контракту"
        ], pitfalls: [
          "Считать по выручке вместо валовой прибыли",
          "Считать payback по ARPA без учета ramp-up (выручка растет не сразу)",
          "Игнорировать churn до окупаемости (часть клиентов не доживает)",
          "Смешивать сегменты с разной маржой и условиями контрактов"
        ], related: ["cac", "gm", "arpa"] },
        { id: "ltv", code: "ltv", name: "LTV (Customer Lifetime Value)", short: "Ожидаемая валовая прибыль от клиента за «жизнь» в продукте. SaaS: ARPA × Gross Margin ÷ Churn.", why: "Определяет, сколько можно тратить на привлечение и где потолок роста.", formula: "LTV ≈ ARPA × gross_margin ÷ churn_rate", tags: ["LTV", "UnitEconomics", "SaaS", "Finance"], howImprove: [
          "Снижать churn (grr вверх)",
          "Увеличивать ARPA (upsell, add-ons)",
          "Поднимать gross margin",
          "Калибровать churn по revenue (GRR/NRR) и валидировать LTV на реальных когортах удержания"
        ], pitfalls: [
          "Неверный churn (logo vs revenue) → фейковый LTV",
          "Использовать краткосрочный churn (например, 30d) для долгосрочного LTV",
          "Считать LTV по выручке, а не по валовой прибыли",
          "Игнорировать expansion (NRR) и получать заниженный LTV для healthy базы"
        ], related: ["ltv_cac", "grr", "nrr"] },
        { id: "ltv_cac", code: "ltv_cac", name: "LTV:CAC ratio", short: "Во сколько раз LTV больше CAC.", why: "Быстрый тест «сходится ли экономика».", formula: "LTV:CAC = ltv ÷ cac", tags: ["UnitEconomics", "LTV", "CAC", "Ratio"], howImprove: [
          "Любые улучшения LTV (удержание/апсейл) и снижения CAC",
          "Ускорять payback: улучшать trial→paid, сокращать sales_cycle и повышать gross margin",
          "Считать ratio отдельно по каналам/сегментам и перераспределять бюджет в самые прибыльные когорты",
          "Использовать guardrails: минимальный GRR и максимальный payback, иначе рост опасен"
        ], pitfalls: [
          "Расти «вширь» при плохом GRR: LTV/CAC может выглядеть норм, но база разваливается",
          "Высокий LTV:CAC при долгом payback может убить кэш‑флоу",
          "Считать ratio на маленькой выборке/ранних когортах — шум",
          "Не разделять по каналам и сегментам — ratio неуправляем"
        ], related: ["ltv", "cac", "payback"] }
      ]
    },
    {
      id: "exp_section",
      code: "EXP",
      name: "Расширение (Expansion)",
      short: "Рост внутри базы: expansion revenue, прирост seats, проникновение по департаментам/use-cases (land & expand).",
      why: "В зрелом B2B основной драйвер устойчивого роста — NRR через expansion. Это дешевле и надежнее, чем бесконечно покупать новых клиентов.",
      formula: "Нет одной формулы. Секция = прирост выручки/мест/проникновения внутри аккаунта.",
      howImprove: [
        "Триггерить expansion из продукта в момент упора в ценность (лимиты, ROI-отчёты, рекомендации)",
        "Строить механики органического роста seats: приглашения, совместная работа, роли/шаблоны",
        "Расширять use-case: второй/третий сценарий, модули/add-ons, интеграции",
        "Делать champion kit и playbooks масштабирования по департаментам",
        "Разделять expansion по механикам (seats/usage/add-ons/price) и усиливать «value-механику»"
      ],
      pitfalls: [
        "Агрессивный upsell без ценности → рост churn (NRR краткосрочно красивый)",
        "Путать expansion от usage и price uplift (непонятно, что реально работает)",
        "«Купили seats, но не используют» — рост без внедрения",
        "Невалидный знаменатель в penetration (нет карты оргструктуры/целевых юнитов)"
      ],
      related: ["expansion", "seat_exp", "acct_pen"],
      tags: ["Expansion", "NRR"],
      children: [
        { id: "expansion", code: "expansion", name: "Выручка от расширения", short: "Дополнительная MRR/ARR от существующих клиентов (upsell/cross-sell/usage growth).", why: "Главный драйвер nrr и устойчивого роста.", formula: "expansion = expansion_mrr (за период)", tags: ["Expansion", "NRR", "Upsell", "Growth"], howImprove: [
          "Строить land and expand: новые use-case, роли, департаменты",
          "Usage-based прайсинг + прозрачные лимиты",
          "CS: success plans с целями расширения",
          "Триггерить expansion из продукта: лимиты/подсказки/ROI-отчеты в момент, когда клиент упирается в ценность"
        ], pitfalls: [
          "Агрессивный upsell может ухудшать CSAT/NPS",
          "Считать expansion без связи с adoption (upsell без ценности повышает churn)",
          "Путать expansion от usage и price uplift — разные рычаги",
          "Не отделять expansion по продуктам/модулям (непонятно, что работает)"
        ], related: ["nrr", "seat_util", "feat_adopt"] },
        { id: "seat_exp", code: "seat_exp", name: "Прирост мест (Net seat expansion rate)", short: "Насколько растет число купленных/активных seats в существующих аккаунтах.", why: "Простая механика роста в seat-based B2B.", formula: "(seats_end − seats_start) ÷ seats_start", tags: ["Seats", "Expansion", "B2B", "Adoption"], howImprove: [
          "Механики приглашений и совместной работы",
          "Ролевые фичи, важные «не только админу»",
          "Отчеты admin о выгоде добавления пользователей",
          "Строить механики органического роста seats: приглашения, совместная работа, роли и шаблоны для команд"
        ], pitfalls: [
          "«Купили seats, но не используют» → рост без ценности",
          "Считать net expansion без учета churned accounts (выжившие искажают картину)",
          "Игнорировать «замороженные seats» (купили, но не активировали)",
          "Смешивать планы с разной моделью (seat-based vs usage-based)"
        ], related: ["seat_util", "nrr", "grr"] },
        { id: "acct_pen", code: "acct_pen", name: "Проникновение в аккаунте (Account penetration)", short: "Доля команд/проектов/департаментов внутри компании, которые реально используют продукт.", why: "Предиктор долгосрочного удержания и защиты от churn.", formula: "used_units ÷ total_target_units", tags: ["Enterprise", "Adoption", "Expansion", "Stickiness"], howImprove: [
          "Templates под разные команды, масштабирование permission",
          "Внутренний champion kit",
          "Enterprise features: audit, SSO, RBAC",
          "Сделать playbook масштабирования внутри компании: champion kit, onboarding для новых департаментов, шаблоны"
        ], pitfalls: [
          "Трудно измерять — важно согласовать прокси",
          "Выбрать прокси, который легко «рисуется» (например, созданные проекты без использования)",
          "Мерить penetration без карты оргструктуры/целевых юнитов — знаменатель невалиден",
          "Не учитывать смену чемпиона/owner — penetration может падать без видимых причин"
        ], related: ["nrr", "ret90", "seat_exp"] }
      ]
    },
    {
      id: "cs_section",
      code: "CS",
      name: "Удовлетворенность и клиентский успех (CS)",
      short: "Лояльность и качество сервиса: NPS/CSAT/CES + эффективность поддержки (FCR, TTR), влияющие на renewals и expansion.",
      why: "В B2B качество поддержки и perceived value напрямую бьют по renewals, референсам и enterprise-сделкам. Средние значения бесполезны без сегментов и контекста touchpoint’ов.",
      formula: "Нет одной формулы. Важно разделять relationship vs transactional сигналы.",
      howImprove: [
        "Сегментировать NPS/CSAT/CES по ролям/планам/сегментам и по типам событий (онбординг/инцидент/релиз)",
        "Закрывающий цикл по detractors: причины → действия → проверка эффекта",
        "Уменьшать effort на setup/интеграциях (CES) через диагностику, docs «по симптомам», шаблоны",
        "Повышать FCR: собирать контекст (логи/версии), макросы, self-serve, устранение топ-причин тикетов в продукте",
        "Ввести SLA по severity и отдельные очереди/дежурства (влияет на TTR)"
      ],
      pitfalls: [
        "Мерить «в среднем» без сегментов (скрывает горящие enterprise-аккаунты)",
        "Bias выборки (отвечают не все; стимуляция оценок искажает)",
        "Подмена «закрыли тикет» = «решили проблему» (ложный FCR/CSAT)",
        "Не разделять relationship и transactional NPS/CSAT — непонятно, что лечить"
      ],
      related: ["nps", "csat", "ces", "fcr", "ttr"],
      tags: ["CS", "NPS", "Support"],
      children: [
        { id: "nps", code: "nps", name: "NPS (Net Promoter Score)", short: "%promoters − %detractors (по шкале 0–10).", why: "Индикатор лояльности и риска churn/роста через рекомендации.", formula: "NPS = %Promoters − %Detractors", tags: ["NPS", "Loyalty", "CS", "Retention"], howImprove: [
          "Закрывать причины detractors",
          "Улучшать reliability и time-to-value",
          "Customer education, QBR, roadmap alignment",
          "Запускать закрывающий цикл: связаться с detractors, классифицировать причины и возвращать в roadmap/CS плейбуки"
        ], pitfalls: [
          "Мерить «в среднем по больнице» без сегментов/ролей",
          "Собирать NPS редко и без контекста (почему поставили оценку)",
          "Не разделять relationship NPS и transactional NPS",
          "Игнорировать non-response bias и низкую выборку"
        ], related: ["grr", "nrr", "csat"] },
        { id: "csat", code: "csat", name: "CSAT (Customer Satisfaction Score)", short: "Доля «довольных» ответов (обычно top-2 box) после взаимодействия.", why: "Отлично ловит проблемы поддержки/фич после релизов.", formula: "CSAT = satisfied_responses ÷ total_responses", tags: ["CSAT", "Support", "Quality", "Experience"], howImprove: [
          "Быстрее решать и лучше объяснять",
          "Улучшать UX в местах, где чаще всего «болит»",
          "Превентивная поддержка (статус-страница, release notes)",
          "Сегментировать CSAT по типам кейсов и связывать с конкретными изменениями (релиз/инцидент/процесс)"
        ], pitfalls: [
          "«Счастливы» могут быть только те, кто вообще ответил (bias)",
          "Собирать CSAT только после поддержки и делать выводы о продукте в целом",
          "Не сегментировать по типам обращений (bug vs how-to vs billing)",
          "Стимулировать оценки и искажать метрику"
        ], related: ["ces", "fcr", "ttr"] },
        { id: "ces", code: "ces", name: "CES (Customer Effort Score)", short: "Насколько «легко» клиенту решить задачу (обычно среднее по шкале).", why: "В B2B снижает скрытую цену внедрения и повышает удержание.", formula: "CES = sum(ratings) ÷ #responses", tags: ["CES", "UX", "Effort", "Retention"], howImprove: [
          "Упростить ключевые флоу и настройки",
          "Улучшить документацию и inline-help",
          "Авто-диагностика и понятные ошибки",
          "Мерить CES на ключевых шагах (setup/интеграции) и устранять топ-3 источника усилий"
        ], pitfalls: [
          "Разные шкалы (1–5, 1–7) — нельзя сравнивать без нормализации",
          "Сравнивать CES между разными сценариями (setup vs простой вопрос)",
          "Мерить CES без привязки к time-to-value и ключевым шагам онбординга",
          "Игнорировать открытые комментарии — теряются причины усилий"
        ], related: ["ttv", "tickets_rate", "ret30"] },
        { id: "fcr", code: "fcr", name: "First Contact Resolution (FCR)", short: "Доля кейсов, решенных без повторных контактов.", why: "Снижает cost-to-serve и повышает CSAT.", formula: "fcr = tickets_resolved_first_touch ÷ tickets_total", tags: ["Support", "Efficiency", "CSAT", "Ops"], howImprove: [
          "Макросы/шаблоны ответов + обучение L1",
          "Улучшить продукт/UX в топ-причинах обращений",
          "Самопомощь: FAQ, in-app troubleshooting",
          "Автоматизировать диагностику и собирать контекст в тикете (логи/версии/шаги), чтобы решать с первого раза"
        ], pitfalls: [
          "«Закрывать тикет» ≠ «решить проблему»",
          "Оптимизировать FCR, закрывая тикеты ранним «не воспроизводится»",
          "Не учитывать повторные контакты по другим каналам (чат/почта/Slack)",
          "Смешивать разные уровни поддержки (L1 vs engineering)"
        ], related: ["csat", "ttr", "tickets_rate"] },
        { id: "ttr", code: "ttr", name: "Time to Resolution (TTR)", short: "Среднее/медианное время от создания тикета до решения.", why: "SLA-качество и прямой вклад в удержание enterprise клиентов.", formula: "median(resolved_at − created_at)", tags: ["Support", "SLA", "Time", "Quality"], howImprove: [
          "Триаж и приоритизация (P1/P2)",
          "Авто-роутинг по компонентам",
          "Улучшить наблюдаемость (logs, traces) для быстрых диагнозов",
          "Ввести SLA по severity и отдельные очереди/дежурства для P1, чтобы не размывать время решения"
        ], pitfalls: [
          "«Решено» может быть формальным без подтверждения клиента",
          "Мерить среднее вместо медианы и перцентилей",
          "Не отделять ожидание клиента/вендора от активной работы команды",
          "Игнорировать P1/P2 приоритизацию — смешанные кейсы дают шум"
        ], related: ["csat", "fcr", "mttr"] }
      ]
    },
    {
      id: "rel_section",
      code: "REL",
      name: "Надежность и поставка (Reliability / Delivery)",
      short: "Техническое качество и скорость доставки: uptime/errors/latency + DORA-метрики (deploy freq, lead time, CFR, MTTR).",
      why: "Для B2B (особенно enterprise) надежность = доверие и renewals. Скорость поставки важна, но только в балансе с изменениями без инцидентов.",
      formula: "Нет одной формулы. Основа — SLO/SLI по ключевым операциям + DORA.",
      howImprove: [
        "Ввести SLO по ключевым операциям (не только «сайт жив») и алерты до клиента",
        "Декомпозировать error rate/latency по операциям, регионам и сегментам клиентов",
        "Уменьшать batch size: маленькие PR/релизы + feature flags + canary/blue-green",
        "Инвестировать в observability (logs/traces), runbooks и быстрый rollback",
        "Делать постмортемы и устранять повторяемые причины (automation/tests/guardrails)"
      ],
      pitfalls: [
        "Считать только полный даунтайм, игнорируя деградации (latency/частичные падения)",
        "Оптимизировать deploy frequency ценой CFR (больше инцидентов)",
        "Скрывать инциденты классификацией ради «лучшей метрики»",
        "Мерить p95 без p99 и без разрезов (хвост убивает enterprise опыт)"
      ],
      related: ["uptime", "err_rate", "lat_p95", "dep_freq", "lt_changes", "cfr", "mttr"],
      tags: ["Reliability", "DORA", "SRE"],
      children: [
        { id: "uptime", code: "uptime", name: "Uptime / Availability", short: "% времени, когда сервис доступен.", why: "В B2B это «право на существование».", formula: "uptime% = (total_time − downtime) ÷ total_time", tags: ["Reliability", "SLO", "Uptime", "Enterprise"], howImprove: [
          "SLO/SLI, алерты, автоскейлинг",
          "Redundancy, graceful degradation",
          "Постмортемы и устранение повторяющихся причин",
          "Сделать прозрачную коммуникацию (status page, инцидент-апдейты) и SLO по ключевым операциям"
        ], pitfalls: [
          "Учитывать только «полный даун», игнорируя деградации",
          "Не различать региональные/частичные падения и общую доступность",
          "Игнорировать planned maintenance и коммуникацию — влияет на perceived uptime",
          "Считать uptime без SLO по ключевым операциям (login может работать, core — нет)"
        ], related: ["lat_p95", "err_rate", "mttr"] },
        { id: "err_rate", code: "err_rate", name: "Error rate", short: "% запросов/операций, завершившихся ошибкой.", why: "Ранний сигнал деградации и источник churn.", formula: "errors ÷ total_requests", tags: ["Reliability", "Errors", "Observability"], howImprove: [
          "Мониторинг по endpoint'ам, canary релизы",
          "Улучшить обработку ошибок и ретраи",
          "Стабилизировать зависимости",
          "Декомпозировать ошибки по операциям и сегментам, заводить SLO и алерты на критические пути"
        ], pitfalls: [
          "Ошибки 4xx/5xx смешаны без смысла",
          "Считать только общий error rate и не видеть конкретные endpoint/операции",
          "Игнорировать client-side errors и сетевые сбои",
          "Не отделять ошибки пользователя (4xx) от ошибок сервиса (5xx) по смыслу"
        ], related: ["uptime", "lat_p95", "csat"] },
        { id: "lat_p95", code: "lat_p95", name: "Latency p95/p99", short: "Время ответа в 95-м перцентиле.", why: "UX и SLA: «среднее» может быть норм, но хвост убивает опыт.", formula: "p95(response_time_ms)", tags: ["Performance", "Latency", "SLO"], howImprove: [
          "Профилирование, кеширование, очереди",
          "Оптимизация запросов, индексы, CDN",
          "Ограничения на тяжелые операции",
          "Ставить performance budgets для ключевых операций и мониторить по регионам/клиентам"
        ], pitfalls: [
          "Мерить только серверную часть без клиентской",
          "Мерить p95 без p99 — критические хвосты остаются незаметны",
          "Не разделять по регионам/клиентам (enterprise VPN, прокси)",
          "Оптимизировать latency, ломая надежность (агрессивные таймауты/кеш без инвалидации)"
        ], related: ["uptime", "err_rate", "ttv"] },
        { id: "dep_freq", code: "dep_freq", name: "DORA: Deployment Frequency", short: "Как часто команда выкатывает изменения.", why: "Скорость доставки ценности и реакции на рынок.", formula: "deployments per day/week", tags: ["DORA", "Delivery", "DevOps", "Speed"], howImprove: [
          "CI/CD, маленькие изменения, feature flags",
          "Автотесты, trunk-based",
          "Feature flags + canary/blue-green, чтобы снижать риск частых изменений",
          "Инвестировать в автотесты и быстрый rollback, чтобы скорость не убивала стабильность"
        ], pitfalls: [
          "Частые деплои без качества → рост инцидентов",
          "Гнаться за частотой и увеличивать размер изменений — растет риск",
          "Считать деплои, а не релизы ценности (feature flags могут скрыть реальную доставку)",
          "Не учитывать тип изменений (hotfix vs product)"
        ], related: ["lt_changes", "cfr", "mttr"] },
        { id: "lt_changes", code: "lt_changes", name: "DORA: Lead Time for Changes", short: "Время от принятия изменения до деплоя в прод.", why: "Показывает «тормоза» процесса разработки и релизов.", formula: "median(deploy_time − commit_or_merge_time)", tags: ["DORA", "LeadTime", "DevOps", "Flow"], howImprove: [
          "Автоматизация тестов и релизов",
          "Уменьшать размер PR, улучшать ревью процесс",
          "Уменьшать batch size: дробить задачи и PR, чтобы быстрее проходить ревью/QA",
          "Автоматизировать окружения и тестовые данные, чтобы убрать ожидание и ручные шаги"
        ], pitfalls: [
          "Нечеткая точка старта (commit? merge? ticket done?)",
          "Смешивать разные типы работы (инфра vs продукт) — метрика теряет смысл",
          "Не учитывать время ожидания ревью/QA как отдельный bottleneck",
          "Выбирать неверный старт (ticket created вместо dev start)"
        ], related: ["dep_freq", "cfr", "mttr"] },
        { id: "cfr", code: "cfr", name: "DORA: Change Failure Rate", short: "Доля деплоев, которые приводят к инциденту/роллбеку/горячему фиксу.", why: "Баланс скорости и стабильности.", formula: "failed_deploys ÷ total_deploys", tags: ["DORA", "Quality", "Incidents", "DevOps"], howImprove: [
          "Canary/blue-green, feature flags",
          "Тест-пирамида, контрактные тесты",
          "Улучшать observability и быстрый rollback",
          "Постмортемы без обвинений + устранение повторяемых причин (automation, tests, guardrails)"
        ], pitfalls: [
          "Скрывать инциденты классификацией, чтобы «улучшить метрику»",
          "Не фиксировать связь деплоя с инцидентом (корреляции теряются)",
          "Считать только rollback и игнорировать деградации/perf regressions",
          "Оптимизировать CFR, уменьшая наблюдаемость и классифицируя инциденты иначе"
        ], related: ["mttr", "err_rate", "uptime"] },
        { id: "mttr", code: "mttr", name: "DORA: Time to Restore Service (MTTR)", short: "Сколько времени нужно, чтобы восстановиться после инцидента.", why: "Критично для enterprise: как быстро встали.", formula: "median(restore_time − incident_start)", tags: ["DORA", "MTTR", "Reliability", "SRE"], howImprove: [
          "Runbooks, on-call, алерты по SLO",
          "Улучшить диагностику (tracing/logs)",
          "Автоматизация rollback",
          "Разделять этапы (detect/mitigate/fix) и улучшать самый длинный через алерты и runbooks"
        ], pitfalls: [
          "Не фиксировать начало/конец инцидента единообразно",
          "Не разделять detect time и fix time — непонятно, что улучшать",
          "Игнорировать коммуникации и обходные пути (workaround) как часть восстановления",
          "Считать MTTR без единого определения start/end и уровней severity"
        ], related: ["cfr", "uptime", "csat"] }
      ]
    },
    {
      id: "sys_section",
      code: "SYS",
      name: "Системные продуктовые метрики",
      short: "Метрики «скрытой стоимости» и доверия: cost-to-serve, gross margin, свежесть/качество данных и интеграций.",
      why: "Можно расти по выручке и проиграть из-за дорогого обслуживания, неустойчивых интеграций и плохих данных. Эти метрики защищают маржу и удержание.",
      formula: "Нет одной формулы. Секция = экономика обслуживания + здоровье данных.",
      howImprove: [
        "Сегментировать cost-to-serve и вкладываться в self-serve там, где тикеты повторяются",
        "Корректно аллоцировать COGS (инфра, support, third-party) и пересматривать при росте",
        "Делать SLO по свежести данных (lag) и алерты до того, как клиент заметит",
        "Добавить проверки полноты/валидности данных (не только «sync success»)",
        "Оптимизировать архитектуру/провайдеров (кеш, storage, compute) без потери reliability"
      ],
      pitfalls: [
        "Считать CTS/GM «в среднем» без сегментов (enterprise часто дороже)",
        "Игнорировать engineering time на инциденты/escalations в cost-to-serve",
        "«Успешный sync» без проверки качества/полноты данных",
        "Нет порогов/SLO → метрика есть, реакции нет"
      ],
      related: ["cts", "gm", "data_fresh"],
      tags: ["Ops", "Finance", "Data"],
      children: [
        { id: "cts", code: "cts", name: "Cost to Serve", short: "Сколько стоит поддержка/инфра/CS на аккаунт или на $ARR.", why: "В B2B легко «проесть» маржу поддержкой enterprise-клиентов.", formula: "(support_cost + infra_cost + cs_cost) ÷ paying_accounts (или ÷ ARR)", tags: ["Ops", "Margin", "Efficiency", "Support"], howImprove: [
          "Самообслуживание и профилактика тикетов",
          "Оптимизация инфраструктуры и архитектуры",
          "Улучшать UX сложных мест",
          "Сегментировать cost-to-serve и инвестировать в self-serve там, где тикеты повторяются"
        ], pitfalls: [
          "Не аллоцировать shared costs → иллюзия «дешево»",
          "Считать cost-to-serve «в среднем» без разреза по сегментам (enterprise часто дороже)",
          "Не учитывать стоимость инцидентов и escalations (engineering time)",
          "Оптимизировать CTS, ухудшая качество поддержки и повышая churn"
        ], related: ["gm", "tickets_rate", "payback"] },
        { id: "gm", code: "gm", name: "Gross Margin", short: "Доля выручки после COGS.", why: "Входит в LTV и CAC payback, определяет «сколько можно инвестировать в рост».", formula: "GM% = (Revenue − COGS) ÷ Revenue", tags: ["Finance", "Margin", "UnitEconomics"], howImprove: [
          "Снижать infra cost, повышать эффективность поддержки",
          "Оптимизация тарифов и упаковки",
          "Аллоцировать COGS корректно (инфра, support, third-party) и пересматривать при росте",
          "Оптимизировать архитектуру/провайдеров (кеш, storage, compute) без ухудшения reliability"
        ], pitfalls: [
          "Не учитывать real COGS (поддержка, инфраструктура, third-party)",
          "Не нормализовать COGS по периодам (annual контракты vs monthly расходы)",
          "Игнорировать стоимость third-party (data providers, email, storage) до момента роста",
          "Считать GM без учета discount/credits и возвратов"
        ], related: ["ltv", "payback", "cts"] },
        { id: "data_fresh", code: "data_fresh", name: "Data freshness / pipeline health", short: "Насколько данные/синхронизации актуальны (lag).", why: "Для data-продуктов «просроченные данные» = потеря доверия и churn.", formula: "median(now − last_success_sync_time)", tags: ["Data", "Integrations", "Reliability", "Trust"], howImprove: [
          "Мониторинг lag, ретраи, алерты",
          "Улучшить стабильность интеграций",
          "Сделать SLO по свежести данных (lag) и алерты до того, как клиент заметит проблему",
          "Добавить проверки полноты/валидности данных, а не только «успешный sync»"
        ], pitfalls: [
  "Считать «успешный sync» без проверки качества/полноты",
  "Игнорировать частичные ошибки и деградации по отдельным объектам/таблицам",
  "Не различать задержку источника данных и задержку вашей обработки (где настоящий bottleneck)",
  "Не фиксировать окно/порог (SLO) — метрика есть, но нет понятного «красного» уровня и реакции"
], related: ["setup_sr", "err_rate", "csat"] }
      ]
    }
  ]
};
