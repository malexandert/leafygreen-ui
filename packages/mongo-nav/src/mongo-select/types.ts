import { MouseEventHandler, ReactNode } from 'react';
import { MongoNavInterface, URLSInterface, OnChangeInterface } from '../types';

export type MongoSelectUrls = NonNullable<URLSInterface['mongoSelect']>;

export type BaseMongoSelectProps = Pick<
  MongoNavInterface,
  'hosts' | 'admin' | 'mode'
> & {
  className?: string;
  onClick?: MouseEventHandler;
  onChange?: (OnChangeInterface: OnChangeInterface) => void;
  loading?: boolean;
  urls: MongoSelectUrls;
};

export interface BaseTriggerProps {
  className?: string;
  children?: ReactNode;
  placeholder: string;
  open?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
