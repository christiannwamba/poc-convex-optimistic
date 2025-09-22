# Convex Optimistic Updates Demo

A demonstration of optimistic updates using Convex and React, showing how to create responsive UIs that update instantly while the server processes requests in the background.

## 🚀 What This Demo Shows

This project demonstrates **optimistic updates** - a technique where the UI updates immediately when a user performs an action, before waiting for the server to confirm the change. This makes applications feel much more responsive.

### Key Features

- **Instant UI Updates**: Counter increments immediately when clicked
- **Artificial Server Delay**: 1.5 second delay simulates real-world network latency
- **Automatic Sync**: UI automatically syncs with server once the response comes back
- **Clean Architecture**: Uses Convex's scheduler system for proper async handling

## 🛠️ How It Works

1. **User clicks button** → Counter updates instantly (optimistic update)
2. **Mutation runs** → Schedules actual database update with `ctx.scheduler.runAfter(1500, ...)`
3. **After 1.5 seconds** → Server confirms the change and UI syncs

### Technical Implementation

- **Frontend**: React with `useMutation().withOptimisticUpdate()`
- **Backend**: Convex mutation that schedules an internal mutation with delay
- **No setTimeout**: Uses Convex's proper scheduling system instead of `setTimeout`

## 🧪 Try It Out

1. **Clone and install**:
   ```bash
   git clone https://github.com/christiannwamba/poc-convex-optimistic.git
   cd poc-convex-optimistic
   pnpm install
   ```

2. **Set up Convex**:
   ```bash
   npx convex dev
   # Follow the setup prompts
   ```

3. **Run the app**:
   ```bash
   pnpm run dev
   ```

4. **Test optimistic updates**:
   - Click the increment button multiple times quickly
   - Notice how the counter updates instantly
   - Watch as the server confirms each increment after 1.5 seconds

## 📁 Project Structure

```
src/
├── IncrementCounter.tsx    # Main component with optimistic updates
├── App.tsx                 # Simple app wrapper
└── main.tsx               # ConvexProvider setup

convex/
├── counter.ts             # Mutation with scheduling
└── schema.ts              # Database schema
```

## 🔧 Key Code Snippets

**Optimistic Update (React)**:
```typescript
const increment = useMutation(api.counter.increment).withOptimisticUpdate(
  (localStore, args) => {
    const currentValue = localStore.getQuery(api.counter.get);
    if (currentValue !== undefined) {
      localStore.setQuery(api.counter.get, {}, currentValue + args.increment);
    }
  }
);
```

**Delayed Mutation (Convex)**:
```typescript
export const increment = mutation({
  args: { increment: v.number() },
  handler: async (ctx, args) => {
    // Schedule actual increment after 1.5 seconds
    await ctx.scheduler.runAfter(1500, internal.counter.performIncrement, {
      increment: args.increment,
    });
  },
});
```

## 🎯 Learning Objectives

- Understanding optimistic updates pattern
- Using Convex's scheduler for delayed execution
- Proper async handling in Convex (no `setTimeout` in mutations)
- Creating responsive user interfaces

## 📚 Documentation

- [Convex Optimistic Updates](https://docs.convex.dev/client/react/optimistic-updates)
- [Convex Scheduling](https://docs.convex.dev/scheduling/scheduled-functions)

## 🤝 Contributing

Feel free to open issues or submit PRs if you find ways to improve this demo!
