use serde::{Deserialize, Serialize};
use swc_plugin::{ast::*, plugin_transform, TransformPluginProgramMetadata};

/* pub use crate::{
    utils::{analyze, analyzer, State},
    visitors::{
        display_name_and_id::display_name_and_id, transpile_css_prop::transpile::transpile_css_prop,
    },
}; */
// use swc_atoms::JsWord;
// use swc_common::{chain, pass::Optional, FileName};
// use swc_ecmascript::visit::{Fold, VisitMut};

/// Static plugin configuration.
#[derive(Default, Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
pub struct Config {
    /// Prefix variables with a readable name, e.g. `primary--1isauia0`.
    #[serde(default = "bool::default")]
    pub display_name: bool,
    /// The hash for a css-variable depends on the file name including createVar().
    /// To ensure that the hash is consistent accross multiple systems the relative path
    /// from the base dir to the source file is used.
    #[serde()]
    pub base_path: String,
}

/// Additional context for the plugin.
#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Context {
    /// The name of the current file.
    #[serde(default)]
    pub filename: Option<String>,
    /// The name of the current file.
    #[serde(default)]
    pub is_server: Option<bool>,
    #[serde(default)]
    pub ssr: Option<bool>,
}

pub struct TransformVisitor;

impl VisitMut for TransformVisitor {
    // Implement necessary visit_mut_* methods for actual custom transform.
    // A comprehensive list of possible visitor methods can be found here:
    // https://rustdoc.swc.rs/swc_ecma_visit/trait.VisitMut.html
}

#[plugin_transform]
pub fn process_transform(program: Program, metadata: TransformPluginProgramMetadata) -> Program {
    let config: Config =
        serde_json::from_str(&metadata.plugin_config).expect("failed to parse plugin config");

    let context: Context =
        serde_json::from_str(&metadata.transform_context).expect("failed to parse plugin context");

    let filename = context.filename.unwrap_or_default();

    if filename.contains(".telefunc.") {
        println!("{} {:?}", filename, metadata);
    }
    // println!("here {:?}", Some(context.filename).as_ref());
    program.fold_with(&mut as_folder(TransformVisitor))
}
