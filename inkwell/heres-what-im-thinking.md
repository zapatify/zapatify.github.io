---
title: "Here's What I'm Thinking..."
layout: default
parent: The Inkwell
nav_order: 2
summary: The special sauce between product and engineering.
description: "What makes the product and engineering relationship work: shared authorship of decisions while they are still soft, why involving engineers early prevents scope explosions, and the cost of throwing requirements over the fence."
permalink: /inkwell/heres-what-im-thinking/
---

# Here's What I'm Thinking...

*On the special sauce between product and engineering, and why it shows up so early.*

The question came near the end of an interview a few months ago, the part where the resume is behind you and someone finally wants to know how you actually think. "What's the special sauce between product and engineering?" the interviewer asked. "What makes it work?"

I went quiet for a second. Not because I didn't have an answer, but because I had all of them at once. The question landed and the room dissolved into a montage: the VP who opened every project by pulling us in and saying *here's what I'm thinking*; the one who built everything in a silo and threw it over the fence when it was far too late to matter; a project seven months past due; a CEO turning to a room full of people and asking, simply, "Why?" I'd lived this question in its best form and its worst, sometimes at the same company, and it all came back in a single breath.

So I needed the second. What follows is the longer version of the answer I gave after it.

## Over the fence

Start with the worst version, because the worst version is what teaches you what the good one was made of.

At one company, one of the people who held the product-owner seat had a method you could describe in a single motion: define the whole thing in isolation, and once it was finished, throw it over the fence to engineering. Requirements arrived the way furniture arrives flat-packed, except no one had checked that all the parts were in the box.

The project was meant to make loan offers faster. The logic already existed in a sprawling Excel model, formulas from finance, operations, and sales; you fed in a borrower's cash-flow data and it returned the offers they qualified for. Our job wasn't to build something fresh around it. It was to implement that logic inside the loan application we already ran in production, a live system serving real customers, which is the kind of work you do not want to do blind. So when I asked early, with plenty of runway left, to see the spreadsheet, the answer told me where this was headed: not yet, you'll see it when it's finished. The single source of truth for the whole system was being kept behind a curtain until it was too late to question.

It came over the fence finished, and we were meeting it cold. We did the discovery we'd been told to wait for, worked through the formulas and lookups, and built our plan around a model we'd had no hand in. Some formulas were stale; half the room couldn't say where the others came from. Then we started building, and the scope grew, from roughly forty features to more than a hundred, almost all of it arriving mid-build rather than at the start.

The reason is the part worth keeping, and it wasn't bad faith. The business had spent the whole project inside the spreadsheet, an abstraction. They had never seen that logic standing inside a real product, and the moment they did, the implications turned concrete, and concrete is what makes ideas flow. This offer suddenly needed that guardrail; this screen implied three more. It only became thinkable once it was built, which is the most expensive moment to start thinking.

So when the CEO asked why we were so far behind, I walked him through the forty-to-a-hundred jump, and he turned to the business side and asked, simply, "Why?" The answer was honest: "Because we didn't think about it back then." They genuinely hadn't, because back then they were looking at a spreadsheet, and a spreadsheet hides everything that only becomes real once it's built. We ran seven months over.

I had tried to show the shape of it before it swallowed the timeline. In a presentation to the CEO, I drew the project clean and steady through its planned milestones, then detonating at the end into a dense cloud of late requirements.

![Project timeline run amok: a clean progress bar that starts at roughly forty core features and ticks through on-time milestones, then erupts near the end into a dense cluster of bubbles (scope creep, deferred features, and 100+ last-minute additions) pushing the actual end far past the planned one, six-plus months and counting.](/assets/inkwell/project-timeline-explosion.png)

*Clean through every planned milestone, then buried at the end under requirements no one raised early. The planned end and the actual end sit six-plus months apart.*

None of this was bad luck, and it wasn't about any one person; it was the predictable output of a method. The largest study of its kind, the Standish Group's CHAOS research, has spent decades naming the same culprits behind failed software projects: incomplete requirements, changing requirements, and too little involvement from the people who understand the work.[^1] The cost curve does the rest, since a misunderstanding caught at the end runs many times what it would have cost caught at the start.[^2] We simply weren't in the room where the start happened.

## The invitation

Now the good version, which I also lived, sometimes in the same building.

Before that fence went up, the same company had a very different person in the product seat, a VP who started projects with four words instead of a finished document: *here's what I'm thinking.* Not a spec handed down, a thought offered up. From day one he pulled in engineering and the team leads, not to rubber-stamp a plan but to help shape one while it was still soft enough to shape. By the time anyone wrote a requirement down, the people who'd have to build it had already argued with it, improved it, and signed their names to it in their heads. Projects that start that way have a quality that's hard to manufacture later: everyone is invested, and everyone is interested, from the first meeting.

When that seat sat empty for a stretch, I took it myself, with one of the team leads carrying engineering beside me. It wasn't the title I'd planned on, but it taught me the thing from the inside. For that run, the people closest to the work owned both halves of it, the what and the why, and we knew exactly why we were building what we built, because we were the ones who'd decided it. The work didn't drift, because there was no gap between the people setting the direction and the people walking it.

And the best product partner I ever had wasn't gentle about any of this. At an earlier company there was a product owner who was, frankly, demanding, more demanding than anyone I've worked with before or since. But his demands were *earned.* He knew exactly what engineering could and couldn't do, so when he pushed, he pushed in the right direction and on the right things. Nobody on the team resented him for it. Or maybe they did, now and then, but it was a difference in philosophy, not a doubt about the technical implementation. Either way, you don't resent a partner who knows your craft well enough to ask the right hard questions; you respect him, and you rise to it. That's the part people miss about the good version: it isn't soft. It can be the most demanding relationship in the building. It just demands from a place of knowing.

Marty Cagan, who has spent a career studying how strong product organizations actually work, draws the line precisely here. There are *feature teams*, handed a finished roadmap and told to build it, order-takers, and there are *empowered product teams*, brought in to help solve the problem and held accountable for the outcome rather than the output.[^3] Engineers can tell the difference in about a week, and they quietly disengage from a product owner who doesn't add value while rallying behind one who does. Every good version I just described was the empowered kind. The fence was the order-taking kind. Same job title, opposite job.

## The case for just deciding

Let me give the other side its strongest version, because it has one.

Pulling everyone into the room early can look like a tax. Meetings multiply. Decisions slow down. A confident owner who simply makes the calls and hands engineering a clean, finished set of requirements can feel faster than design-by-committee, and design-by-committee is a real failure mode: a dozen voices, no decision, a roadmap shaped by whoever talked longest. If "involve everyone early" curdles into "let everyone relitigate everything forever," you've just traded one disaster for another.

But notice what that argument actually indicts, and what it doesn't. The failure there is indecision, not involvement. My most demanding product owner was also the most decisive; he made calls constantly and fast. The difference is that he made them from inside the room, with the people who knew the work, while the plan was still soft. The bad VP was just as willing to decide; he simply decided alone, in the dark, and revealed it when it was finished. Both were decisive. One was present.

So the answer was never "drag everyone into every meeting." It's narrower and harder than that: get the *right* people in the room while the thing is still soft enough to change, and then decide. Being there early isn't the enemy of moving fast. It's the thing that keeps you off the seven-month detour. That explosion at the end isn't the price of decisiveness. It's the price of deciding without the people who could have told you what you didn't know yet.

## Why the good version works

Here's the part the timelines never show, and it's the real answer to the interview question.

Start with what the data says plainly. The same CHAOS research that names the killers of failed projects also names the single most powerful predictor of successful ones, and it isn't budget or tooling or a star project manager. It's involvement, the people who understand the work being in it early.[^1] That's not a culture nicety. It's the highest-weighted success factor they found, across tens of thousands of projects.

But *why* does involvement matter that much? The mechanism is ownership, and the research on it is unambiguous. People defend, improve, and care about what they had a hand in making; psychologists have called it the IKEA effect, the simple finding that we value a thing more when we helped build it.[^4] The sharpest recent version of this should give every throw-it-over-the-fence manager pause. In a controlled experiment, people were handed goals authored two ways: some wrote their own, and some received goals an AI generated from their own reflections. The AI's goals were measurably *better* on paper, more specific, more actionable. And they lost. The people with the objectively worse, self-authored goals were more committed, rated them more important, and were far likelier to actually act on them weeks later, nearly three-quarters of them, against fewer than half in the handed-to-them group. The thing that predicted follow-through wasn't quality. It was authorship.[^5]

Read that back into a software team and the whole picture snaps into focus. *Here's what I'm thinking* works because it makes engineering co-authors, and co-authors catch problems early for the simplest possible reason: it's their problem too. They have skin in it from the first meeting, so the half-formed worry gets voiced while it's still cheap, the question gets asked before the formula goes stale. That's the special sauce, mechanically. Shared authorship turns engineers from people who receive problems into people who go looking for them.

And it's exactly why the over-the-fence project was dead before it landed. A finished specification that no one in the build authored commands no ownership, no matter how polished it is, the same way the AI's better goals commanded none. The fence doesn't just delay information. It severs authorship, and authorship was the thing that would have held the project up. Shared ownership early is what keeps the timeline a thin, steady line. The fence is what builds the explosion at the end.

## Here's what I'm thinking

So here's the answer I gave, after the second I needed to find it.

The special sauce between product and engineering isn't a process, or a ceremony, or a tool you can buy and install. It's a relationship, and a specific one: the people who decide what to build and the people who build it sharing authorship of the thing while it's still being decided. Do that, and the problems show up early, as conversations, the cheap kind, the kind you have standing at someone's desk. Skip it, and the same problems show up late, as missed deadlines and a spreadsheet nobody can explain, the expensive kind. The sauce is just the early version of a conversation you're going to have either way.

That's also how I try to run things now, because I've been on both sides of the fence. I've had it thrown over me, and for a stretch I held the seat that does the throwing, and I know which one builds something people are proud of. I'd rather open a project with *here's what I'm thinking* than close it with *here's what you're building.* I'd rather have the demanding partner who knows my craft than the polished document that doesn't know me at all. I want the room where engineering is in it from day one, because that's the only room I've ever seen the good version happen in.

Back then, the answer took me only a second to find. But that second held months of memory, the good projects and the bad ones, every version of the special sauce I'd lived on both sides of the fence. The pause was short, but what it brought back wasn't.

---

## Sources

[^1]: The Standish Group, *CHAOS Report*. Across decades of data on tens of thousands of software projects, the most frequently cited drivers of challenged and failed projects include incomplete requirements, changing requirements, and lack of user/stakeholder involvement; user involvement consistently ranks as the single highest-weighted success factor. <https://personal.utdallas.edu/~chung/SYSM6309/chaos_report.pdf>

[^2]: Boehm, B. W. *Software Engineering Economics* (Prentice Hall, 1981), the origin of the "cost of change" curve; and Stecklein, J. M., et al. "Error Cost Escalation Through the Project Life Cycle." NASA Johnson Space Center (2004), which found the cost of correcting a requirements error rising from roughly 1 unit when caught during the requirements phase to many times that in later phases. The precise multiplier is debated, but the direction is not. <https://ntrs.nasa.gov/citations/20100036670>

[^3]: Cagan, M. *Inspired* and *Empowered* (Silicon Valley Product Group); see also "Product vs. Feature Teams," SVPG. Cagan distinguishes *feature teams*, handed a roadmap and measured on delivery, essentially order-takers, from *empowered product teams*, which are brought into the problem and held accountable for outcomes. <https://www.svpg.com/product-vs-feature-teams/>

[^4]: Norton, M. I., Mochon, D., & Ariely, D. "The IKEA Effect: When Labor Leads to Love." *Journal of Consumer Psychology* 22(3): 453-460 (2012). On ownership in work settings specifically, see Pierce, J. L., Kostova, T., & Dirks, K. T. "Toward a Theory of Psychological Ownership in Organizations." *Academy of Management Review* 26(2): 298-310 (2001). <https://doi.org/10.1016/j.jcps.2011.08.002>

[^5]: "Optimized but Unowned: How AI-Authored Goals Undermine the Motivation They Are Meant to Drive." Preregistered experiment (N = 470), 2026. AI-authored goals scored higher on quality criteria but produced lower psychological ownership and commitment; at a two-week follow-up, 72.8% of self-authored participants had acted on two or more of their goals, versus 46.6% of those given AI-authored goals, with psychological ownership mediating the effect. <https://arxiv.org/abs/2605.12344>
