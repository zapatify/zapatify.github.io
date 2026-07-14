---
title: The Inkwell
layout: default
nav_order: 11
has_children: true
has_toc: false
permalink: /inkwell/
---

# The Inkwell
{: .no_toc }

Essays and opinion pieces. Less about the apps, more about the ideas I keep
chewing on. Topics will wander.
{: .fs-6 .fw-300 }

<style>
  .inkwell-list { list-style: none; margin: 1.75rem 0 0; padding: 0; }
  .inkwell-list li { margin: 0 0 0.75rem; padding-left: 0; }
  ul.inkwell-list > li::before { content: none !important; display: none !important; }
  .inkwell-card {
    display: flex;
    align-items: stretch;
    gap: 0.85rem;
    padding: 0.85rem 1.05rem;
    border: 1px solid rgba(128, 128, 128, 0.28);
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .inkwell-card:hover {
    border-color: rgba(128, 128, 128, 0.55);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  }
  .inkwell-bar {
    flex: 0 0 auto;
    width: 3px;
    border-radius: 3px;
    background: rgba(128, 128, 128, 0.45);
    margin: 0.1rem 0;
  }
  .inkwell-body { display: flex; flex-direction: column; min-width: 0; }
  .inkwell-title { font-weight: 600; line-height: 1.3; }
  .inkwell-dek { font-style: italic; opacity: 0.7; margin-top: 0.1rem; }
  .inkwell-badge-new {
    margin-left: 0.5rem;
    padding: 0.05rem 0.45rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #fff;
    background: #7253ed;
    vertical-align: middle;
  }
  .inkwell-badge-new:not([hidden]) {
    display: inline-block;
  }
  .inkwell-date {
    display: block;
    font-size: 0.8rem;
    opacity: 0.6;
    margin-top: 0.25rem;
  }
</style>

<ul class="inkwell-list">
{% assign inkwell_articles = site.html_pages | where: "parent", page.title | sort: "date" | reverse %}
{% for article in inkwell_articles %}
  <li>
    <a class="inkwell-card" href="{{ article.url | relative_url }}">
      <span class="inkwell-bar" aria-hidden="true"></span>
      <span class="inkwell-body">
        <span class="inkwell-title">
          {{ article.title }}
          <span class="inkwell-badge-new" data-published="{{ article.date | date: '%Y-%m-%d' }}" hidden>New</span>
        </span>
        {% if article.summary %}<span class="inkwell-dek">{{ article.summary }}</span>{% endif %}
        {% if article.date %}<span class="inkwell-date">Published {{ article.date | date: "%B %-d, %Y" }}</span>{% endif %}
      </span>
    </a>
  </li>
{% endfor %}
</ul>

<script>
  (function () {
    var TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
    var now = new Date();
    var badges = document.querySelectorAll('.inkwell-badge-new[data-published]');
    for (var i = 0; i < badges.length; i++) {
      var badge = badges[i];
      var published = new Date(badge.getAttribute('data-published') + 'T00:00:00');
      if (!isNaN(published.getTime()) && (now - published) <= TWO_WEEKS_MS) {
        badge.hidden = false;
      }
    }
  })();
</script>
