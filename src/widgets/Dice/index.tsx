import Image from 'next/image';
import { FC, ReactNode, SetStateAction, useEffect, useState, use } from 'react';
import { Background, SecondaryBackground } from '../GameInterface';
import s from './styles.module.scss';
import { MultipleBets, InputField, OutputField, Wager, PlaceBetButton } from '../GameInterface';
import * as DiceModel from './model';
import { sessionModel } from '@/entities/session';
import { useUnit } from 'effector-react';
import Heads2Image from '@/public/media/games_assets/coinflip/Heads2.svg';
import Tails1Image from '@/public/media/games_assets/coinflip/Tails1.svg';
import Web3 from 'web3';
import { BigNumber, ethers } from 'ethers';
import * as Api from '@/shared/api';
import { ABI as IERC20 } from '@/shared/contracts/ERC20';
import { BetStatus, Model as BetStatusModel } from '@/widgets/BetStatus';
import { web3 } from '@/entities/web3';
import { Firework } from '../Firework';

//export * from './Dice';