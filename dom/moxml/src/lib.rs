extern crate proc_macro;

use {
    proc_macro2::{Ident, TokenStream, TokenTree},
    proc_macro_error::{filter_macro_errors, MacroError, ResultExt},
    snax::{ParseError, SnaxAttribute, SnaxFragment, SnaxItem, SnaxSelfClosingTag, SnaxTag},
};

#[proc_macro_hack::proc_macro_hack]
pub fn moxml(input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    filter_macro_errors! {
        let item = snax::parse(input.into()).map_err(Error::SnaxError).unwrap_or_exit();
        expand_item(item).unwrap_or_exit().into()
    }
}

fn expand_item(item: SnaxItem) -> Result<TokenStream, Error> {
    let output = match item {
        SnaxItem::Tag(tag) => expand_tag(tag),
        SnaxItem::SelfClosingTag(tag) => expand_self_closing_tag(tag),
        SnaxItem::Fragment(SnaxFragment { children }) => expand_children(children),
        SnaxItem::Content(atom) => expand_content(atom),
    }?;
    Ok(output.into())
}

fn expand_tag(
    SnaxTag {
        name,
        attributes,
        children,
    }: SnaxTag,
) -> Result<TokenStream, Error> {
    Ok(cons(
        cons(expand_element(name)?, expand_attributes(attributes)?),
        expand_children(children)?,
    ))
}

fn expand_self_closing_tag(tag: SnaxSelfClosingTag) -> Result<TokenStream, Error> {
    panic!("expand_self_closing_tag")
}

fn expand_element(name: Ident) -> Result<TokenStream, Error> {
    panic!("expand_element")
}

fn expand_attributes(attrs: Vec<SnaxAttribute>) -> Result<TokenStream, Error> {
    panic!("expand_attributes")
}

fn expand_children(children: Vec<SnaxItem>) -> Result<TokenStream, Error> {
    Ok(children
        .into_iter()
        .map(expand_item)
        .collect::<Result<Vec<_>, _>>()?
        .into_iter()
        .fold(quote::quote!(), cons))
}

fn expand_content(content: TokenTree) -> Result<TokenStream, Error> {
    // TODO detect whether this is a formatting block or not?
    panic!("expand_content")
}

fn cons(mut l: TokenStream, r: TokenStream) -> TokenStream {
    l.extend(r);
    l
}

enum Error {
    SnaxError(ParseError),
}

impl Into<MacroError> for Error {
    fn into(self) -> MacroError {
        match self {
            Error::SnaxError(ParseError::UnexpectedEnd) => {
                MacroError::call_site(format!("input ends before expected"))
            }
            Error::SnaxError(ParseError::UnexpectedItem(item)) => {
                // TODO https://github.com/LPGhatguy/snax/issues/9
                MacroError::call_site(format!("did not expect {:?}", item))
            }
            Error::SnaxError(ParseError::UnexpectedToken(token)) => {
                MacroError::new(token.span(), format!("did not expect '{}'", token))
            }
        }
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
