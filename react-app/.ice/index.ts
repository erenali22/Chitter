import '@/global.css'
import type { PageConfig, PageConfigDefinition } from './types';
import { Link, Outlet, useParams, useSearchParams, useLocation, useNavigate } from '@ice/runtime/router';
import { defineAppConfig, useAppData, useData, useConfig, history, KeepAliveOutlet, useMounted, ClientOnly, withSuspense, useSuspenseData, defineDataLoader, defineServerDataLoader, defineStaticDataLoader } from '@ice/runtime';
import * as webModule1 from '@ice/runtime';
import type { MetaType, TitleType, LinksType, ScriptsType, DataType, MainType} from '@ice/runtime';

let Meta: MetaType;
let Title: TitleType;
let Links: LinksType;
let Scripts: ScriptsType;
let Data: DataType;
let Main: MainType;
if (import.meta.target === 'web') {
  Meta = webModule1.Meta;
  Title = webModule1.Title;
  Links = webModule1.Links;
  Scripts = webModule1.Scripts;
  Data = webModule1.Data;
  Main = webModule1.Main;
}
      

function definePageConfig(pageConfig: PageConfig | PageConfigDefinition): PageConfigDefinition {
  if (typeof pageConfig !== 'function') {
    return () => pageConfig;
  } else {
    return pageConfig;
  }
}

export {
  definePageConfig,
  Link,
  Outlet,
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
  defineAppConfig,
  useAppData,
  useData,
  useConfig,
  history,
  KeepAliveOutlet,
  useMounted,
  ClientOnly,
  withSuspense,
  useSuspenseData,
  defineDataLoader,
  defineServerDataLoader,
  defineStaticDataLoader,
  Meta,
  Title,
  Links,
  Scripts,
  Data,
  Main
};

export * from './types';
