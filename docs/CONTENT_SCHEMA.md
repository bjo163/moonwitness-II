# MOONWITNESS — CONTENT SCHEMA

The initial schema is intentionally lightweight.

## Person / Character

```yaml
id:
type:
name:
aliases: []
role: []
era:
description:
skills: []
witnesses: []
relationships: []
fault_lines: []
past_presence: []
events: []
messages: []
source:
provenance:
status:
```

## Event

```yaml
id:
title:
era:
date:
location:
trigger:
what_happened:
actors: []
witnesses: []
seduction: []
fault_lines: []
exposure: []
past_presence: []
conflict: []
sanity_last_breath: []
consequence:
source:
provenance:
status:
```

## Witness Log

```yaml
id:
date_time:
era:
event:
witnessed_by: []
signal:
observation:
message:
seduction:
fault_lines: []
exposure:
past_presence:
conflict:
sanity_last_breath:
interpretation:
audit:
evaluation:
balancing:
promoting:
change:
next_phase:
source:
provenance:
status:
```

## Message

```yaml
id:
title:
from:
to:
date:
era:
type:
witnesses: []
context:
message:
signal:
related_event:
related_people: []
related_fault_lines: []
related_past_presence: []
source:
provenance:
status:
```

## Fault Line

```yaml
id:
title:
type:
entity_a:
entity_b:
trigger:
pressure:
tension:
misalignment:
hidden:
risk:
related_events: []
related_messages: []
related_characters: []
related_era:
status:
```

## Past Presence

```yaml
id:
title:
origin:
past_event:
past_era:
trace:
what_remains:
where_present:
who_affected: []
current_signal:
current_influence:
audit:
evaluation:
balancing:
promoting:
next_phase:
related_entities: []
status:
```

## Promoting

```yaml
id:
target:
source_past_presence:
reason:
audit:
evaluation:
balancing:
decision:
status:
next_phase:
notes:
```

## Era

```yaml
id:
title:
order:
description:
characters: []
events: []
witnesses: []
messages: []
fault_lines: []
past_presence: []
changes: []
status:
```

## Initial Status Vocabulary

```
DRAFT
REVIEW
PUBLISHED
ARCHIVED
FORGOTTEN
REOPENED
UNKNOWN
UNRESOLVED
PROMOTED
```

Keep schemas permissive at first. Tighten only when real usage shows the need.
