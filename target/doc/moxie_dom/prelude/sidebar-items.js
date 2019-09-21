initSidebarItems({"macro":[["memo","Memoizes `init` at this callsite, cloning a cached `Stored` if it exists and `Arg` is the same  as when the stored value was created."],["memo_state","Root a state variable at this callsite, returning a [`Key`] to the state variable.  Re-initializes the state variable if the capture argument changes."],["memo_with","Memoizes the provided function, caching the intermediate `Stored` value in memoization storage  and only re-initializing it if `Arg` has changed since the cached value was created. Regardless  of prior cached results, `with` is then called in to produce a return value."],["once","Runs the provided expression once per [`topo::Id`]. The provided value will always be cloned on  subsequent calls unless dropped from storage and reinitialized in a later `Revision`."],["once_with","Memoizes `expr` once at the callsite. Runs `with` on every iteration."],["state","Convenience wrapper around [`memo_state`]."]],"mod":[["embed","Integration points for the moxie runtime. Generally not called directly by applications."],["topo","`topo` creates a hierarchy of scoped, nested [environments][topo::Env] whose shape matches the function callgraph. These environments store singletons indexed by their type, and references to environmental values are available only to an enclosed call scope. When a `#![topo::aware]` function is called, its parent environment is cheaply propagated along with any additional values added at appropriate callsites."]],"struct":[["Closure","A handle to both a closure in Rust as well as JS closure which will invoke the Rust closure."],["JsValue","Representation of an object owned by JS."],["Key","A `Key` offers access to a state variable. The key allows reads of the state variable through a snapshot taken when the `Key` was created. Writes are supported with [Key::update] and [Key::set]."]],"trait":[["UnwrapThrowExt","An extension trait for `Option<T>` and `Result<T, E>` for unwraping the `T` value, or throwing a JS error if it is not available."]]});