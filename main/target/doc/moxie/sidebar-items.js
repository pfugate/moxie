initSidebarItems({"fn":[["sib_cons",""]],"macro":[["make_state","Root a state [`Var`] at this callsite, returning an up-to-date [`Commit`] of its value and  a unique [`Key`] which can be used to commit new values to the variable."],["memo","Memoize the provided function at the bound callsite, invalidating previous results only if  the explicitly passed argument has changed."],["once","Signature"],["produce","Produce a tree node to be maintained by the current component topology. Panics  if no compatible `Parent` is found in the [`topo::Env`]."],["produce_without_attaching","Produce a node without attaching it to the `Parent` in its environment."],["show",""],["show_one","Signature"],["state",""]],"struct":[["Clomp","TODO find a better name. A wrapper for a closure which is called as if it were a child component, i.e. in its own topological point."],["Commit","A read-only pointer to the value of a state variable at a particular revision."],["Empty",""],["Key","A Key commits new values to a state variable. Keys carry a weak reference to the state variable to prevent cycles, which means that all operations called against them are fallible -- we cannot know before calling a method that the state variable is still live."],["Revision","Revisions measure moxie's notion of time passing. Each [`Runtime`] increments its Revision on every iteration. [`crate::Commit`]s to state variables are annotated with the Revision during which they were made."],["Runtime","A `Runtime` is the entry point of the moxie runtime environment. On each invocation of `run_once`, it calls the root with which it was initialized. Typically this is invoked in a loop which sleeps until the provided waker is invoked, as is the case in the `Future` implementation. Usually root closure will cause some memoized side effect to the render environment in order to produce a view of the input data. A Runtime's root closure will also transitively establish event handlers, either via locally polled `Future`s or via the containing environment's callback or event mechanisms."],["SibList",""]],"trait":[["Component","TODO explain a component...somehow"],["Node","A type which can be attached to parents of its type and which can receive children."],["Parent",""]]});