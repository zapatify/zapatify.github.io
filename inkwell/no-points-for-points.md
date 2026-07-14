---
title: "No Points for Points"
layout: default
parent: The Inkwell
nav_order: 3
date: 2026-07-13
summary: "How I gauge engineers without a single metric."
description: "How to actually gauge an engineer's performance: delivery, craft, and impact, not story points, t-shirt sizes, or hours logged, and why DORA metrics measure a system, not a person."
permalink: /inkwell/no-points-for-points/
---

# No Points for Points

In my previous role as a software engineering leader, a good part of the job was not writing code but managing the people who did. One of my responsibilities was reporting workload data to finance.

Every sprint I owed them a breakdown for their capitalization schedules. Greenfield work had to be tracked separately from brownfield, since new builds could be capitalized and maintenance couldn't. The mechanics were straightforward enough. Every epic tied to a specific project, so at the end of each sprint I'd take the hours a given engineer had worked, look at the tickets they'd closed, turn that into a percentage, and assign their hours across the projects they'd touched. It was never an especially precise assessment, but it was good enough for finance's purposes. That breakdown then got passed up to the management team.

And that's when the questions would start. Why was this engineer's output lighter than that one's? Why did so few of that person's hours land on the project that mattered most? But the one that came up most: this engineer worked two weeks and closed twelve points, while that one worked the same two weeks and closed twenty-four. Twice the output. Why?

To the untrained eye, that spreadsheet looks like a fair gauge of an engineer's performance. Two people, same sprint, here's who closed more and here's where their time went. Clean, comparable, easy to defend in a room full of non-technical managers.

I'll tell you from experience: it is not. That number measured which tickets happened to have someone's name on them when the sprint closed. It never once measured the engineer, and it never told me who on that team I could count on.

The true measure of an engineer lives in three areas, and I've been watching the same three for years: delivery, craft, and impact.

## What I don't measure

Before I dive into the three, it's worth naming the things I've seen other managers use.

**Story points.** A story point is an estimate produced by a team to help that team forecast how much work fits into an iteration. It was never a unit of output, and the moment you compare engineers by points delivered, it stops being one at all.

**T-shirt sizes.** Same problem, but coarser. A t-shirt size is a guess made at the moment you know the least about the work. Grading someone on how many larges they closed rewards whoever grabbed the tickets that turned out to be smalls.

**Hours logged.** This measures presence. Presence and contribution are not the same thing, and the engineer who solves the problem in two hours because they thought about it in the shower is not less valuable than the one who spent two weeks debugging.

There's a name for what goes wrong with all of these. Goodhart's Law: when a measure becomes a target, it stops being a good measure.[^1] Tell an engineer that points are the score and they'll give you more points. The number goes up and the thing you cared about doesn't move.

Each of these measures something real. None of them measures an engineer. There are no points for points.

So let's look at what I think counts.

## Delivery

The first question: did this engineer deliver what they were asked to deliver?

That sounds obvious enough to be useless, so let me unpack what I'm watching for.

Did they own the task from beginning to end? Not "did they write the code." Did they carry the work across the finish line, including the unglamorous parts nobody assigned to anyone. The migration. The rollout. The follow-up when the first version didn't behave the way anyone expected.

Do they understand the definition of done? This is where some engineers trip, and they trip the same way every time. Their definition of done means the pull request is merged. The code is in, and they've washed their hands clean. But a merged PR is the sprint before the finish line, not the finish line. Done is the migration that ran clean, the feature holding up in production, the ticket that doesn't come back a week later with someone else's name on it. An engineer who believes ownership ends at the merge is usually an engineer who keeps missing on delivery, because they're aiming at the merge instead of the outcome.

On the other hand, you have scope creep, and it's rarely carelessness. Some engineers just can't find the edge of the work. Every ticket opens into another ticket, and the task grows until someone stops it (usually the engineering manager).

And the test that tells me the most: do I have to keep asking where we are with this? Some engineers surface state without being prompted. They tell you when the thing is blocked, when the estimate slipped, when the approach changed. Others go quiet, and quiet reads as fine until it doesn't.

This is a pattern I've watched play out over and over. The more senior an engineer gets, the more they exhibit a specific behavior: they understand what's being asked of them, and they do that work. When they find something along the way (the dead code, the missing index, the config that's been wrong since 2021), they log it and keep going. It gets handled later, on purpose, as its own piece of work.

The more junior engineer wants to prove themselves. So they fix everything at once. They open the file, see the problem, fix the problem, notice the adjacent problem, fix that, notice the test coverage is thin, write the tests, notice the tests reveal a bug, fix the bug. Three days later there's a four-hundred-line pull request that does six things, and the thing they were originally asked to do is one of them. It's a recursive trap made entirely out of good intentions.

Which brings me back to ownership. It's the part I weigh most, and it's more specific than it sounds. Owning a task doesn't mean doing all of it alone. Asking for help is not a failure of ownership; refusing to ask is often the bigger problem. Ownership is about where the responsibility sits, and the owner is the person it never leaves.

I've watched an engineer blur that line. Stuck on something, they'd email someone else for help, which is fine so far. But in their mind, sending the email was the handoff. The task was now the other person's problem, and if it stalled, it stalled because that person hadn't gotten back to them yet. The work would sit for days, and when I asked where it stood, the answer was some version of "I'm waiting on so-and-so." They'd converted a request for help into a transfer of responsibility (and ownership), and they believed the transfer was legitimate.

It isn't. When you own the task and you need help, the help is an input you go get. If the person you emailed goes quiet, chasing them is your job, because the outcome is still yours. The owner is the one who stays on the hook until the thing is done, no matter how many people they pulled in along the way.

Delivery is not speed. It's completion. It's the difference between an engineer who reduces the number of things you have to hold in your head and one who increases it.

## Craft

The second question: what kind of code does this engineer produce?

Is it clean? Readable? Could another engineer open the file six months from now and understand what it's doing and why? Can they change it without fear?

The fastest way to show what I mean is to take one small, boring task and watch three different engineers write it. Same job every time. Even someone who is not a developer, but familiar with coding concepts, can look at this Ruby code and more or less infer what it's doing.

Here's the engineer with craft.

```ruby
class OrderPricer
  FREE_SHIPPING_THRESHOLD = 75.00
  SHIPPING_COST = 8.00

  TIER_DISCOUNTS = {
    standard: 0.00,
    silver:   0.05,
    gold:     0.10,
    platinum: 0.15
  }.freeze

  def initialize(subtotal:, tier:)
    @subtotal = subtotal
    @tier = tier
  end

  def total
    discounted = @subtotal - discount
    discounted + shipping(discounted)
  end

  private

  def discount
    @subtotal * TIER_DISCOUNTS.fetch(@tier, 0.00)
  end

  def shipping(amount)
    amount >= FREE_SHIPPING_THRESHOLD ? 0.00 : SHIPPING_COST
  end
end
```

Notice that the numbers have names. The tiers live in one place, so adding a "diamond" tier next quarter is a one-line change nobody has to hunt for. `total` reads like a sentence. If this breaks in production at 3AM, the person paged can follow it half-asleep.

Now the same job from an engineer whose craft isn't as polished.

```ruby
def calc(sub, t)
  # TODO: move these numbers to config someday
  if t == "standard"
    d = 0
  else
    if t == "silver"
      d = sub * 0.05
    else
      if t == "gold"
        d = sub * 0.1
      else
        if t == "platinum"
          d = sub * 0.15
        else
          d = 0 # TODO: what about new tiers??
        end
      end
    end
  end
  total = sub - d
  # TODO: shipping is probably wrong, check with someone
  if total >= 75
    total = total
  else
    total = total + 8
  end
  return total
end
```

This works. It returns the right number. And it is a small disaster. The nested `if` staircase gets one rung deeper every time the business adds a tier. The numbers are scattered through the body as magic constants. There are three TODOs, which is three admissions that the author knew something was wrong and shipped anyway. There's a `total = total` line that does nothing, left behind like a footprint. This is the engineer who leaves a trail of TODOs like breadcrumbs to a house nobody is ever going to build. Every one of them is a small debt, and the person who pays it is whoever opens this file next, which is usually the author, eighteen months later, with no memory of writing it.

Then there's a third engineer, and this is the one worth talking about, because their code is not sloppy at all.

```ruby
def calc(s, t)
  (s - s * {silver: 0.05, gold: 0.10, platinum: 0.15}.fetch(t, 0)).then { |x| x + (x >= 75 ? 0 : 8) }
end
```

That is the entire thing. One line. It produces exactly the same answer as the clean version, and the engineer who wrote it is proud of it, because they did the most with the least. This is code golf: brevity treated as the point. And I want to be careful here, because a junior looking at this often reads it as the most skilled of the three. It's dense, it's clever, it clearly took someone who knows the language.

But go try to change it. Add a tier and you're editing a hash literal buried mid-expression. The threshold and the shipping cost are magic numbers wedged inside a chained block. Nobody paged at 3AM is going to safely modify this line. Craft isn't measured against the compiler, it's measured against the next human, and this engineer optimized for the wrong reader. They wrote something to be admired, not maintained. Fewest lines is not the goal. Fewest surprises is.

The pull request tells you the rest. Is the process smooth, or a constant back-and-forth? I don't mean substantive review; disagreement about approach is healthy, and a PR that starts a real architectural conversation is a good PR. I mean the friction that shouldn't be there. Reviewers asking what a function does. Reviewers asking why a change is in this PR at all. The same note three reviews running.

Code gets read far more often than it gets written. An engineer with craft is writing for the person doing the reading, and half the time that person is them.

And craft pulls against delivery on purpose. Craft without delivery is an engineer polishing something nobody's waiting on. Delivery without craft is an engineer building next year's incident. You want the tension. You want someone who feels both and makes the call.

## Impact

The third question: what effect does this engineer have on the people around them?

On the team, the department, and the company. Concretely:

Do they share their work? Not just merge it. Talk about it, write it down, explain the decision so the next person doesn't have to rediscover it.

Do they volunteer to help others? When someone's stuck in a channel at 4PM, does this person go look?

Do they let others help them? This one gets skipped, and it's the one I watch closest. An engineer who cannot accept help is an engineer who is going to be stuck alone, at length, at some point, on something that matters.

Do they step up when help is needed? Not when it's assigned. When it's needed.

And the last one, which sounds harsh but is the clearest signal I have: if they left the team tomorrow, would we feel it?

There's a distinction inside that question that matters. An engineer can be impossible to replace because they hoard context. They're the only person who understands billing, and they've made sure of it. That's not impact, that's risk. The engineer with real impact is the one whose absence you'd feel because the people around them got better while they were there. The team's floor came up. Take them out and the floor drops.

## Why not DORA

Now, there is a measure for engineers. But it gauges them as a whole, as a team, not one by one. You may have heard of it. It's called DORA.

The four keys (deployment frequency, lead time for changes, change failure rate, time to restore service) are measures of a delivery system.[^2] They describe the health of the pipeline the team ships through, which is what the research was built to do.[^3] That's a team-level instrument, not an individual one.

Judging an engineer on DORA is like judging a chef on their health inspection score. An A means the walk-in holds temperature, the surfaces are clean, and the raw chicken isn't stored above the lettuce. You want the A. But it says nothing about whether the food is good. A chef can plate the best dish in the city in a kitchen that fails inspection, and the place with a spotless record can be serving food nobody wants to eat.

DORA tells you where the system is slow and where it's fragile. Point it at an individual and it stops measuring what you think it's measuring, and starts shaping behavior you don't want.

## Holding the three together

Delivery, craft, impact. None of them is sufficient on its own, and the failure modes are legible.

Strong delivery, weak craft: work ships and the system gets harder to change. You're borrowing.

Strong craft, weak delivery: the code is beautiful and there isn't much of it. Nothing lands.

Strong on both, no impact: a good individual contributor who's about to find their ceiling, because past a certain point the job stops being about what you produce.

I don't score these. There's no rubric with weights, and there shouldn't be, because the moment there's a number an engineer will optimize the number. That's not a character flaw, that's just what happens when you tell someone what the target is.

And that's the part of this work I love most. Delivery, craft, and impact don't fit on a dashboard. No widget reads them off, no quarterly number stands in for them, and none ever will. You learn to see them the way you learn anything in a craft, by doing the work long enough to recognize it in someone else. Gauging an engineer isn't data entry. It's tradecraft, and it belongs to us as software engineering leaders.

---

## Sources

[^1]: The principle is known as Goodhart's Law, after the economist Charles Goodhart, whose 1975 work on UK monetary policy first made the observation. The familiar phrasing, that a measure which becomes a target ceases to be a good measure, is Marilyn Strathern's later generalization. Strathern, M. "'Improving ratings': audit in the British University system." *European Review* 5(3): 305-321 (1997).

[^2]: DORA. "DORA's software delivery metrics: the four keys." <https://dora.dev/guides/dora-metrics-four-keys/>

[^3]: Forsgren, N., Humble, J., & Kim, G. *Accelerate: The Science of Lean Software and DevOps.* IT Revolution Press (2018).
