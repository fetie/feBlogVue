import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store,GetterTree, MutationTree, ActionTree } from 'vuex'
import {fetchSocial,fetchSiteInfo} from '@/api'
import {State} from './types/state'
import {Mutations} from './types/mutation'
import {Actions} from './types/action'
import {Getters} from './types/getter'

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()


const runAt = '1589878800000';
let timer:NodeJS.Timer | null = null;
const state:State = {
    loading: false,
    runTimeInterval: '',
    socials: [],
    websiteInfo: {
        id: 0,
        desc: '',
        notice: '',
        domain: '',
        name: '',
        slogan: '',
        avatar: '',
        _id: '',
    }
}

const mutations: MutationTree<State> & Mutations = {
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    SET_SOCIALS: (state, v) => {
        state.socials = v;
    },
    SET_SITE_INFO: (state, v) =>{
      state.websiteInfo = v;
    },
    GET_RUNTIME_INTERVAL: (state) => {
        if (!timer || !state.runTimeInterval) {
            clearInterval(Number(timer))
            timer = setInterval(() => {
                // state.runTimeInterval = getTimeInterval(runAt);
                state.runTimeInterval = (runAt);
            }, 1000);
        }
    }
}

const actions: ActionTree<State, State> & Actions = {
    setLoading: ({commit}, v) => {
        commit('SET_LOADING', v);
    },
    initComputeTime: ({commit}) => {
        commit('GET_RUNTIME_INTERVAL');
    },
    getSiteInfo: ({commit,state}) =>{
        return new Promise(resolve => {
            if (state.websiteInfo.id){
                resolve(state.websiteInfo)
            }else {
                fetchSiteInfo().then(res => {
                    let data = res.result || {}
                    commit('SET_SITE_INFO',data);
                    resolve(data);
                }).catch(err => {
                    resolve(null);
                })
            }
        })
    },
    getSocials: ({commit,state}) =>{
        return new Promise((resolve => {
            if (state.socials.length>0){
                resolve(state.socials)
            } else {
                fetchSocial().then(res =>{
                    let data = res.result || []
                    commit('SET_SOCIALS',data);
                    resolve(data);
                }).catch(err =>{
                    resolve([]);
                })
            }
        }))
    }
}

const getters: GetterTree<State, State> & Getters = {
    loading: state => state.loading,
    runTimeInterval: state => state.runTimeInterval,
    notice: state => state.websiteInfo?state.websiteInfo.notice:'',
    socials: state => state.socials,
    websiteInfo: state => state.websiteInfo
}

// Create a new store instance.
export const store = createStore<State>({
  state() {
    return state
  },
  mutations: mutations,
  actions: actions,
  getters: getters
})

export function useStore () {
  return baseUseStore(key)
}
