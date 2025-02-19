export type ImpactValue = "minor" | "moderate" | "serious" | "critical" | null;

export type TagValue = string;

export type ReporterVersion = "v1" | "v2" | "raw" | "rawEnv" | "no-passes";

export type RunOnlyType = "rule" | "rules" | "tag" | "tags";

export type resultGroups =
  | "inapplicable"
  | "passes"
  | "incomplete"
  | "violations";

export type AriaAttrsType =
  | "boolean"
  | "nmtoken"
  | "mntokens"
  | "idref"
  | "idrefs"
  | "string"
  | "decimal"
  | "int";

export type AriaRolesType = "abstract" | "widget" | "structure" | "landmark";

export type DpubRolesType =
  | "section"
  | "landmark"
  | "link"
  | "listitem"
  | "img"
  | "navigation"
  | "note"
  | "separator"
  | "none"
  | "sectionhead";

type HtmlContentTypes =
  | "flow"
  | "sectioning"
  | "heading"
  | "phrasing"
  | "embedded"
  | "interactive";

// Array of length 2 or greater
export type MultiArray<T> = [T, T, ...T[]];

// Selectors within a frame
export type BaseSelector = string;

export type ShadowDomSelector = MultiArray<BaseSelector>;
export type CrossTreeSelector = BaseSelector | ShadowDomSelector;
export type LabelledShadowDomSelector = { fromShadowDom: ShadowDomSelector };

// Cross-frame selectors
export type FramesSelector = Array<
  CrossTreeSelector | LabelledShadowDomSelector
>;
export type UnlabelledFrameSelector = CrossTreeSelector[];
export type LabelledFramesSelector = {
  fromFrames: MultiArray<FramesSelector[0]>;
};
/**
 * @deprecated Use UnlabelledFrameSelector instead
 */
export type CrossFrameSelector = UnlabelledFrameSelector;

// Context options
export type Selector =
  | Node
  | BaseSelector
  | LabelledShadowDomSelector
  | LabelledFramesSelector;
export type SelectorList = Array<Selector | FramesSelector> | NodeList;
export type ContextProp = Selector | SelectorList;
export type ContextObject =
  | {
      include: ContextProp;
      exclude?: ContextProp;
    }
  | {
      exclude: ContextProp;
      include?: ContextProp;
    };
export type ContextSpec = ContextProp | ContextObject;
/** Synonym to ContextSpec */
export type ElementContext = ContextSpec;

export type SerialSelector =
  | BaseSelector
  | LabelledShadowDomSelector
  | LabelledFramesSelector;
export type SerialFrameSelector = SerialSelector | FramesSelector;
export type SerialSelectorList = Array<SerialFrameSelector>;

export type SerialContextObject =
  | {
      include: SerialSelector | SerialSelectorList;
      exclude?: SerialSelector | SerialSelectorList;
    }
  | {
      exclude: SerialSelector | SerialSelectorList;
      include?: SerialSelector | SerialSelectorList;
    };

export interface FrameContextObject {
  include: UnlabelledFrameSelector[];
  exclude: UnlabelledFrameSelector[];
}

export type RunCallback<T = AxeResults> = (error: Error, results: T) => void;

export interface RuleSpec {
  id: string;
  selector?: string;
  impact?: "minor" | "moderate" | "serious" | "critical";
  excludeHidden?: boolean;
  enabled?: boolean;
  pageLevel?: boolean;
  reviewOnFail?: boolean;
  any?: any[];
  all?: any[];
  none?: any[];
  tags?: string[];
  preload?: boolean;
  actIds?: string[];
  matches?: Function;
}

export interface TestEngine {
  name: string;
  version: string;
}
export interface TestRunner {
  name: string;
}
export interface TestEnvironment {
  userAgent: string;
  windowWidth: number;
  windowHeight: number;
  orientationAngle?: number;
  orientationType?: string;
}
export interface RunOnly {
  type: RunOnlyType;
  values: TagValue[] | string[];
}
export interface RuleObject {
  [key: string]: {
    enabled: boolean;
  };
}
export interface RunOptions {
  runOnly?: RunOnly | TagValue[] | string[] | string;
  rules?: RuleObject;
  reporter?: ReporterVersion | string;
  resultTypes?: resultGroups[];
  selectors?: boolean;
  ancestry?: boolean;
  xpath?: boolean;
  absolutePaths?: boolean;
  iframes?: boolean;
  elementRef?: boolean;
  frameWaitTime?: number;
  preload?: boolean | PreloadOptions;
  performanceTimer?: boolean;
  pingWaitTime?: number;
}
export interface PreloadOptions {
  assets: string[];
  timeout?: number;
}
export interface AxeResults extends EnvironmentData {
  toolOptions: RunOptions;
  passes: Result[];
  violations: Result[];
  incomplete: Result[];
  inapplicable: Result[];
}
export interface Result {
  description: string;
  help: string;
  helpUrl: string;
  id: string;
  impact?: ImpactValue;
  tags: TagValue[];
  nodes: NodeResult[];
}
export interface NodeResult {
  html: string;
  impact?: ImpactValue;
  target: UnlabelledFrameSelector;
  xpath?: string[];
  ancestry?: UnlabelledFrameSelector;
  any: CheckResult[];
  all: CheckResult[];
  none: CheckResult[];
  failureSummary?: string;
  element?: HTMLElement;
}
export interface CheckResult {
  id: string;
  impact: string;
  message: string;
  data: any;
  relatedNodes?: RelatedNode[];
}
export interface RelatedNode {
  html: string;
  target: UnlabelledFrameSelector;
  xpath?: string[];
  ancestry?: UnlabelledFrameSelector;
  element?: HTMLElement;
}
export interface RuleLocale {
  [key: string]: {
    description: string;
    help: string;
  };
}
export interface CheckMessages {
  pass: string | { [key: string]: string };
  fail: string | { [key: string]: string };
  incomplete?: string | { [key: string]: string };
}
export interface CheckLocale {
  [key: string]: CheckMessages;
}
export interface Locale {
  lang?: string;
  rules?: RuleLocale;
  checks?: CheckLocale;
}
export interface AriaAttrs {
  type: AriaAttrsType;
  values?: string[];
  allowEmpty?: boolean;
  global?: boolean;
  unsupported?: boolean;
}
export interface AriaRoles {
  type: AriaRolesType | DpubRolesType;
  requiredContext?: string[];
  requiredOwned?: string[];
  requiredAttrs?: string[];
  allowedAttrs?: string[];
  nameFromContent?: boolean;
  unsupported?: boolean;
}
export interface HtmlElmsVariant {
  contentTypes?: HtmlContentTypes[];
  allowedRoles: boolean | string[];
  noAriaAttrs?: boolean;
  shadowRoot?: boolean;
  implicitAttrs?: { [key: string]: string };
  namingMethods?: string[];
}
export interface HtmlElms extends HtmlElmsVariant {
  variant?: { [key: string]: HtmlElmsVariant };
}
export interface Standards {
  ariaAttrs?: { [key: string]: AriaAttrs };
  ariaRoles?: { [key: string]: AriaRoles };
  htmlElms?: { [key: string]: HtmlElms };
  cssColors?: { [key: string]: number[] };
}
export interface Spec {
  branding?: string | Branding;
  reporter?: ReporterVersion | string | AxeReporter;
  checks?: Check[];
  rules?: Rule[];
  standards?: Standards;
  locale?: Locale;
  disableOtherRules?: boolean;
  axeVersion?: string;
  noHtml?: boolean;
  allowedOrigins?: string[];
  // Deprecated - do not use.
  ver?: string;
}
/**
 * @deprecated Use branding: string instead to set the application key in help URLs
 */
export interface Branding {
  brand?: string;
  application?: string;
}
export interface CheckHelper {
  async: () => (result: boolean | undefined | Error) => void;
  data: (data: unknown) => void;
  relatedNodes: (nodes: Element[]) => void;
}
export interface AfterResult {
  id: string;
  data?: unknown;
  relatedNodes: SerialDqElement[];
  result: boolean | undefined;
  node: SerialDqElement;
}
export interface Check {
  id: string;
  evaluate?:
    | string
    | ((
        this: CheckHelper,
        node: Element,
        options: unknown,
        virtualNode: VirtualNode
      ) => boolean | undefined | void);
  after?:
    | string
    | ((results: AfterResult[], options: unknown) => AfterResult[]);
  options?: any;
  matches?: string;
  enabled?: boolean;
  metadata?: {
    impact?: ImpactValue;
    messages?: CheckMessages;
  };
}
export interface Rule {
  id: string;
  selector?: string;
  impact?: ImpactValue;
  excludeHidden?: boolean;
  enabled?: boolean;
  pageLevel?: boolean;
  any?: string[];
  all?: string[];
  none?: string[];
  tags?: string[];
  matches?: string | ((node: Element, virtualNode: VirtualNode) => boolean);
  reviewOnFail?: boolean;
  actIds?: string[];
  metadata?: Omit<RuleMetadata, "ruleId" | "tags" | "actIds">;
}
export interface AxePlugin {
  id: string;
  run(...args: any[]): any;
  commands: {
    id: string;
    callback(...args: any[]): void;
  }[];
  cleanup?(callback: Function): void;
}
export interface RuleMetadata {
  ruleId: string;
  description: string;
  help: string;
  helpUrl: string;
  tags: string[];
  actIds?: string[];
}
export interface SerialDqElement {
  source: string;
  nodeIndexes: number[];
  selector: UnlabelledFrameSelector;
  xpath: string[];
  ancestry: UnlabelledFrameSelector;
}
export interface DqElement extends SerialDqElement {
  element: Element;
  toJSON(): SerialDqElement;
}
export interface DqElementConstructor {
  new (elm: Element, options?: { absolutePaths?: boolean }): DqElement;
  mergeSpecs(
    childSpec: SerialDqElement,
    parentSpec: SerialDqElement
  ): SerialDqElement;
}
export interface PartialRuleResult {
  id: string;
  result: "inapplicable";
  pageLevel: boolean;
  impact: null;
  nodes: Array<Record<string, unknown>>;
}
export interface PartialResult {
  frames: SerialDqElement[];
  results: PartialRuleResult[];
  environmentData?: EnvironmentData;
}
type PartialResults = Array<PartialResult | null>;
export interface FrameContext {
  frameSelector: CrossTreeSelector;
  frameContext: FrameContextObject;
}

export interface RawCheckResult extends Omit<CheckResult, "relatedNodes"> {
  relatedNodes?: Array<SerialDqElement | DqElement>;
}

export interface RawNodeResult<T extends "passed" | "failed" | "incomplete"> {
  node: SerialDqElement | DqElement;
  any: RawCheckResult[];
  all: RawCheckResult[];
  none: RawCheckResult[];
  impact: ImpactValue | null;
  result: T;
}

export interface RawResult extends Omit<Result, "nodes"> {
  inapplicable: Array<never>;
  passes: RawNodeResult<"passed">[];
  incomplete: RawNodeResult<"incomplete">[];
  violations: RawNodeResult<"failed">[];
  pageLevel: boolean;
  result: "failed" | "passed" | "incomplete" | "inapplicable";
}

export type AxeReporter<T = unknown> = (
  rawResults: RawResult[],
  option: RunOptions,
  resolve: (report: T) => void,
  reject: (error: Error) => void
) => void;

export interface VirtualNode {
  actualNode?: Node;
  shadowId?: string;
  children?: VirtualNode[];
  parent?: VirtualNode;
  attr(attr: string): string | null;
  hasAttr(attr: string): boolean;
  props: { [key: string]: unknown };
  boundingClientRect: DOMRect;
}

export interface CustomNodeSerializer<T = SerialDqElement> {
  toSpec: (dqElm: DqElement) => T;
  mergeSpecs: (nodeSpec: T, parentFrameSpec: T) => T;
}

export interface NodeSerializer {
  update: <T>(serializer: CustomNodeSerializer<T>) => void;
  toSpec: (node: Element | VirtualNode) => SerialDqElement;
  dqElmToSpec: (
    dqElm: DqElement | SerialDqElement,
    options?: RunOptions
  ) => SerialDqElement;
  mergeSpecs: (
    nodeSpec: SerialDqElement,
    parentFrameSpec: SerialDqElement
  ) => SerialDqElement;
}

export interface Utils {
  getFrameContexts: (
    context?: ElementContext,
    options?: RunOptions
  ) => FrameContext[];
  shadowSelect: (selector: CrossTreeSelector) => Element | null;
  shadowSelectAll: (selector: CrossTreeSelector) => Element[];
  getStandards(): Required<Standards>;
  isContextSpec: (context: unknown) => context is ContextSpec;
  isContextObject: (context: unknown) => context is ContextObject;
  isContextProp: (context: unknown) => context is ContextProp;
  isLabelledFramesSelector: (
    selector: unknown
  ) => selector is LabelledFramesSelector;
  isLabelledShadowDomSelector: (
    selector: unknown
  ) => selector is LabelledShadowDomSelector;

  DqElement: DqElementConstructor;
  uuid: (
    options?: { random?: Uint8Array | Array<number> },
    buf?: Uint8Array | Array<number>,
    offset?: number
  ) => string | Uint8Array | Array<number>;
  nodeSerializer: NodeSerializer;
}

export interface Aria {
  getRoleType: (role: string | Element | VirtualNode | null) => string | null;
}

export interface Dom {
  isFocusable: (node: Element | VirtualNode) => boolean;
  isNativelyFocusable: (node: Element | VirtualNode) => boolean;
}

export type AccessibleTextOptions = {
  inControlContext?: boolean;
  inLabelledByContext?: boolean;
};

export interface Text {
  accessibleText: (element: Element, options?: AccessibleTextOptions) => string;
}

export interface Commons {
  aria: Aria;
  dom: Dom;
  text: Text;
}

export interface EnvironmentData {
  testEngine: TestEngine;
  testRunner: TestRunner;
  testEnvironment: TestEnvironment;
  url: string;
  timestamp: string;
}

export let version: string;
export let plugins: any;
export let utils: Utils;
export let commons: Commons;

/**
 * Source string to use as an injected script in Selenium
 */
export let source: string;

/**
 * Object for axe Results
 */
export let AxeResults: AxeResults;

/**
 * Runs a number of rules against the provided HTML page and returns the resulting issue list
 *
 * @param   {ElementContext} context  Optional The `Context` specification object @see Context
 * @param   {RunOptions}     options  Optional Options passed into rules or checks, temporarily modifying them.
 * @param   {RunCallback}    callback Optional The function to invoke when analysis is complete.
 * @returns {Promise<AxeResults>|void} If the callback was not defined, axe will return a Promise.
 */
export interface run<T = AxeResults> {
  (context?: ElementContext): Promise<T>;
  (options: RunOptions): Promise<T>;
  (callback: (error: Error, results: T) => void): void;
  (context: ElementContext, callback: RunCallback<T>): void;
  (options: RunOptions, callback: RunCallback<T>): void;
  (
    context: ElementContext,
    options: RunOptions,
    callback: RunCallback<T>
  ): void;
}

/**
 * Method for configuring the data format used by axe. Helpful for adding new
 * rules, which must be registered with the library to execute.
 * @param  {Spec}       Spec Object with valid `branding`, `reporter`, `checks` and `rules` data
 */
export interface configure {
  (spec: Spec): void;
}

/**
 * Run axe in the current window only
 * @param   {ElementContext} context  Optional The `Context` specification object @see Context
 * @param   {RunOptions}     options  Optional Options passed into rules or checks, temporarily modifying them.
 * @returns {Promise<PartialResult>}  Partial result, for use in axe.finishRun.
 */
export interface runPartial {
  (context: ElementContext, options: RunOptions): Promise<PartialResult>;
}

/**
 * Create a report from axe.runPartial results
 * @param   {PartialResult[]}     partialResults  Results from axe.runPartial, calls in different frames on the page.
 * @param   {RunOptions}     options  Optional Options passed into rules or checks, temporarily modifying them.
 */
export interface finishRun {
  (partialResults: PartialResults, options: RunOptions): Promise<AxeResults>;
}

/**
 * Searches and returns rules that contain a tag in the list of tags.
 * @param  {Array}  tags  Optional array of tags
 * @return {Array}  Array of rules
 */
export interface getRules {
  (tags?: string[]): RuleMetadata[];
}

/**
 * Restores the default axe configuration
 */
export interface reset {
  (): void;
}

/**
 * Function to register a plugin configuration in document and its subframes
 * @param  {Object}    plugin    A plugin configuration object
 */
export interface registerPlugin {
  (plugin: AxePlugin): void;
}

/**
 * Function to clean up plugin configuration in document and its subframes
 */
export interface cleanup {
  (): void;
}

/**
 * Set up alternative frame communication
 */
export interface frameMessenger {
  (frameMessenger: FrameMessenger): void;
}

/**
 * Setup axe-core so axe.common functions can work properly.
 */
export interface setup {
  (node?: Element | Document): VirtualNode;
}

/**
 * Clean up axe-core tree and caches. `axe.run` will call this function at the end of the run so there's no need to call it yourself afterwards.
 */
export interface teardown {
  (): void;
}

/**
 * Check if a reporter is registered
 */
export interface hasReporter {
  (reporterName: string): boolean;
}

/**
 * Get a reporter based the name it is registered with
 */
export interface getReporter<T> {
  (reporterName: string): AxeReporter<T>;
}

/**
 * Register a new reporter, optionally setting it as the default
 */
export interface addReporter<T> {
  (reporterName: string, reporter: AxeReporter<T>, isDefault?: boolean): void;
}

// axe.frameMessenger
export interface FrameMessenger {
  open: (topicHandler: TopicHandler) => Close | void;
  post: (
    frameWindow: Window,
    data: TopicData,
    replyHandler: ReplyHandler
  ) => boolean | void;
}
export interface Close {
  (): void;
}
export interface TopicHandler {
  (data: TopicData, responder: Responder): void;
}
export interface ReplyHandler {
  (message: any | Error, keepalive: boolean, responder: Responder): void;
}
export interface Responder {
  (
    message: any | Error,
    keepalive?: boolean,
    replyHandler?: ReplyHandler
  ): void;
}
export interface TopicData {
  topic: string;
}
export interface ReplyData {
  channelId: string;
  message: any;
  keepalive: boolean;
}
