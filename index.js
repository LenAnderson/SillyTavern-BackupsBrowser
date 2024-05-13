import { characters, getPastCharacterChats, getRequestHeaders, messageFormatting, name1, openCharacterChat } from '../../../../script.js';
import { getContext } from '../../../extensions.js';
import { getGroupPastChats, importGroupChat, openGroupChat, selected_group } from '../../../group-chats.js';
import { POPUP_TYPE, Popup } from '../../../popup.js';
import { SlashCommand } from '../../../slash-commands/SlashCommand.js';
import { SlashCommandParser } from '../../../slash-commands/SlashCommandParser.js';



SlashCommandParser.addCommandObject(SlashCommand.fromProps({ name: 'backups',
    callback: async(args, value)=>{
        /**@type {HTMLElement[]}*/
        let pagination = [];
        /**@type {HTMLElement}*/
        let list;
        let page = 0;
        let pageSize = 50;
        const dom = document.createElement('div'); {
            dom.classList.add('stbb--root');
            dom.style.textAlign = 'left';
            const pgTop = document.createElement('div'); {
                pagination.push(pgTop);
                pgTop.classList.add('stbb--pagination');
                dom.append(pgTop);
            }
            list = document.createElement('div'); {
                list.classList.add('stbb--list');
                list.textContent = 'Loading...';
                dom.append(list);
            }
            const pgBot = document.createElement('div'); {
                pagination.push(pgBot);
                pgBot.classList.add('stbb--pagination');
                dom.append(pgBot);
            }
        }
        const renderList = () => {
            list.innerHTML = '';
            for (const file of data.slice(page * pageSize, (page + 1) * pageSize)) {
                const item = document.createElement('div'); {
                    item.classList.add('stbb--item');
                    const head = document.createElement('div'); {
                        head.classList.add('stbb--head');
                        const details = document.createElement('div'); {
                            details.classList.add('stbb--details');
                            const date = document.createElement('div'); {
                                date.classList.add('stbb--date');
                                date.textContent = new Date(file.modified).toISOString().split(/[TZ]/).slice(0,2).join(' ');
                                details.append(date);
                            }
                            const size = document.createElement('div'); {
                                size.classList.add('stbb--size');
                                const idx = Math.floor(Math.log(file.size) / Math.log(1024));
                                size.textContent = `${Math.round(10 * file.size / Math.pow(1024, idx)) / 10}${['B', 'KB', 'MB', 'GB', 'TB'][idx]}`;
                                details.append(size);
                            }
                            head.append(details);
                        }
                        const actions = document.createElement('div'); {
                            actions.classList.add('stbb--actions');
                            const view = document.createElement('div'); {
                                view.classList.add('menu_button');
                                view.classList.add('fa-solid', 'fa-file-lines');
                                view.title = 'View chat';
                                view.addEventListener('click', async()=>{
                                    /**@type {HTMLElement[]}*/
                                    let pagination = [];
                                    /**@type {HTMLElement}*/
                                    let list;
                                    let page = 0;
                                    let pageSize = 50;
                                    const dom = document.createElement('div'); {
                                        const pgTop = document.createElement('div'); {
                                            pagination.push(pgTop);
                                            pgTop.classList.add('stbb--pagination');
                                            dom.append(pgTop);
                                        }
                                        list = document.createElement('div'); {
                                            list.classList.add('stbb--list');
                                            list.textContent = 'Loading...';
                                            dom.append(list);
                                        }
                                        const pgBot = document.createElement('div'); {
                                            pagination.push(pgBot);
                                            pgBot.classList.add('stbb--pagination');
                                            dom.append(pgBot);
                                        }
                                    }
                                    const renderList = () => {
                                        list.innerHTML = '';
                                        let idx = chat.length - page * pageSize;
                                        for (const mes of chat.slice(page * pageSize, (page + 1) * pageSize)) {
                                            idx--;
                                            const msg = document.createElement('div'); {
                                                msg.classList.add('stbb--message');
                                                msg.classList.add('mes');
                                                const head = document.createElement('div'); {
                                                    head.classList.add('stbb--head');
                                                    const index = document.createElement('div'); {
                                                        index.classList.add('stbb--index');
                                                        index.textContent = idx;
                                                        head.append(index);
                                                    }
                                                    const name = document.createElement('div'); {
                                                        name.classList.add('stbb--name');
                                                        name.textContent = mes.name;
                                                        head.append(name);
                                                    }
                                                    const date = document.createElement('div'); {
                                                        date.classList.add('stbb--date');
                                                        date.textContent = mes.send_date;
                                                        head.append(date);
                                                    }
                                                    const swipes = document.createElement('div'); {
                                                        swipes.classList.add('stbb--swipes');
                                                        swipes.textContent = `${mes.swipes?.length ?? 0} Swipes`;
                                                        if (mes.swipes?.length ?? 0 > 0) {
                                                            swipes.classList.add('stbb--clickable');
                                                            swipes.addEventListener('click', ()=>{
                                                                const dom = document.createElement('div'); {
                                                                    dom.classList.add('stbb--swipesDlg');
                                                                    for (const swipe of mes.swipes) {
                                                                        const outer = document.createElement('div'); {
                                                                            outer.classList.add('mes');
                                                                            const inner = document.createElement('div'); {
                                                                                inner.classList.add('mes_text');
                                                                                inner.innerHTML = messageFormatting(
                                                                                    swipe,
                                                                                    mes.name,
                                                                                    mes.is_system,
                                                                                    mes.is_user,
                                                                                    null,
                                                                                );
                                                                                outer.append(inner);
                                                                            }
                                                                            dom.append(outer);
                                                                        }
                                                                    }
                                                                }
                                                                const dlg = new Popup(dom, POPUP_TYPE.TEXT, null, { okButton:'Back', wide:true });
                                                                dlg.show();
                                                            });
                                                        }
                                                        head.append(swipes);
                                                    }
                                                    msg.append(head);
                                                }
                                                const text = document.createElement('div'); {
                                                    text.classList.add('mes_text');
                                                    text.innerHTML = messageFormatting(
                                                        mes.mes,
                                                        mes.name,
                                                        mes.is_system,
                                                        mes.is_user,
                                                        null,
                                                    );
                                                    msg.append(text);
                                                }
                                                list.append(msg);
                                            }
                                        }
                                        renderPagination();
                                    };
                                    const renderPagination = () => {
                                        const makePagination = ()=>{
                                            const frag = document.createDocumentFragment();
                                            const prev = document.createElement('div'); {
                                                prev.classList.add('stbb--pg-prev');
                                                prev.classList.add('menu_button');
                                                if (page == 0) prev.classList.add('stbb--disabled');
                                                prev.textContent = '«';
                                                prev.title = 'Previous page';
                                                prev.addEventListener('click', ()=>{
                                                    if (page == 0) return;
                                                    page--;
                                                    renderList();
                                                });
                                                frag.append(prev);
                                            }
                                            for (let i = 0; i < Math.ceil(data.length / pageSize); i++) {
                                                const num = document.createElement('div'); {
                                                    num.classList.add('stbb--pg-num');
                                                    num.classList.add('menu_button');
                                                    if (i == page) num.classList.add('stbb--pg-current');
                                                    num.textContent = `${i + 1}`;
                                                    num.title = `Page ${i + 1}`;
                                                    num.addEventListener('click', ()=>{
                                                        if (i == page) return;
                                                        page = i;
                                                        renderList();
                                                    });
                                                    frag.append(num);
                                                }
                                            }
                                            const next = document.createElement('div'); {
                                                next.classList.add('stbb--pg-next');
                                                next.classList.add('menu_button');
                                                if (page + 1 >= Math.ceil(data.length / pageSize)) next.classList.add('stbb--disabled');
                                                next.textContent = '»';
                                                next.title = 'Next page';
                                                next.addEventListener('click', ()=>{
                                                    if (page + 1 >= Math.ceil(data.length / pageSize)) return;
                                                    page++;
                                                    renderList();
                                                });
                                                frag.append(next);
                                            }
                                            return frag;
                                        };
                                        for (const pg of pagination) {
                                            pg.replaceChildren(makePagination());
                                        }
                                    };
                                    const dlg = new Popup(dom, POPUP_TYPE.TEXT, null, { okButton:'Back', wide:true });
                                    dlg.show();
                                    const result = await fetch('/api/plugins/files/get', {
                                        method: 'POST',
                                        headers: getRequestHeaders(),
                                        body: JSON.stringify({ file: `/backups/${file.path}` }),
                                    });
                                    if (!result.ok) {
                                        toastr.error(`${result.status}: ${result.statusText}`, 'Something went wrong.');
                                        dlg.hide();
                                        return;
                                    }
                                    const chat = JSON.parse(`[${(await result.text()).replace(/\n/g, ',')}]`).toReversed();
                                    const data = chat;
                                    renderList();
                                });
                                actions.append(view);
                            }
                            const restore = document.createElement('div'); {
                                restore.classList.add('menu_button');
                                restore.classList.add('menu_button');
                                restore.classList.add('fa-solid', 'fa-file-import');
                                restore.title = 'Restore chat / import as new chat';
                                restore.addEventListener('click', async()=>{
                                /**@type {HTMLInputElement} */
                                    const inp = document.querySelector('#chat_import_file');
                                    const result = await fetch('/api/plugins/files/get', {
                                        method: 'POST',
                                        headers: getRequestHeaders(),
                                        body: JSON.stringify({ file: `/backups/${file.path}` }),
                                    });
                                    if (!result.ok) {
                                        toastr.error(`${result.status}: ${result.statusText}`, 'Something went wrong.');
                                        dlg.hide();
                                        return;
                                    }
                                    const f = new File([await result.blob()], file.path.slice(5));
                                    const container = new DataTransfer();
                                    container.items.add(f);
                                    inp.files = container.files;
                                    document.querySelector('#chat_import_file_type').value = file.path.split('.').slice(-1)[0];
                                    // inp.dispatchEvent(new Event('change', { bubbles:true }));
                                    const fd = new FormData(document.querySelector('#form_import_chat'));
                                    fd.append('user_name', name1);
                                    if (selected_group) {
                                        const re = /^(\d\d\d\d)-(\d?\d)-(\d?\d) @(\d?\d)h (\d?\d)m (\d?\d)s (\d?\d?\d)ms$/;
                                        await importGroupChat(fd);
                                        const chats = (await getGroupPastChats(selected_group)).filter(c=>re.test(c.file_name));
                                        chats.forEach(c=>c.ts = Number(c.file_name.replace(re, (_,...parts)=>{
                                            const [year,month,date,hour,minute,second,milli] = parts.map(it=>Number(it));
                                            return milli + second * 1000 + minute * 100000 + hour * 10000000 + date * 1000000000 + month * 100000000000 + year * 10000000000000;
                                        })));
                                        chats.sort((a, b) => a.ts - b.ts);
                                        console.log('[BACKUPS]', '[CHATS]', JSON.parse(JSON.stringify(chats)));
                                        openGroupChat(selected_group, chats.pop().file_name);
                                    } else {
                                        await jQuery.ajax({
                                            type: 'POST',
                                            url: '/api/chats/import',
                                            data: fd,
                                            beforeSend: function () {
                                            },
                                            cache: false,
                                            contentType: false,
                                            processData: false,
                                            success: async function (data) {
                                                const re = /^.+ - (\d\d\d\d)-(\d?\d)-(\d?\d) @(\d?\d)h (\d?\d)m (\d?\d)s (\d?\d?\d)ms imported\.jsonl$/;
                                                const chats = (await getPastCharacterChats(getContext().characterId)).filter(c=>re.test(c.file_name));
                                                chats.forEach(c=>c.ts = Number(c.file_name.replace(re, (_,...parts)=>{
                                                    const [year,month,date,hour,minute,second,milli] = parts.map(it=>Number(it));
                                                    return milli + second * 1000 + minute * 100000 + hour * 10000000 + date * 1000000000 + month * 100000000000 + year * 10000000000000;
                                                })));
                                                chats.sort((a, b) => a.ts - b.ts);
                                                console.log('[BACKUPS]', '[CHATS]', JSON.parse(JSON.stringify(chats)));
                                                openCharacterChat(chats.pop().file_name.split('.').slice(0,-1).join('.'));
                                            },
                                            error: function () {
                                            // oops
                                            },
                                        });
                                    }
                                    dlg.hide();
                                });
                                actions.append(restore);
                            }
                            head.append(actions);
                        }
                        item.append(head);
                    }
                    const body = document.createElement('div'); {
                        body.classList.add('stbb--body');
                        body.classList.add('mes');
                        body.addEventListener('click', ()=>{
                            text.classList.toggle('stbb--expand');
                        });
                        const text = document.createElement('div'); {
                            text.classList.add('mes_text');
                            new Promise(async()=>{
                                const result = await fetch('/api/plugins/files/get/last-line', {
                                    method: 'POST',
                                    headers: getRequestHeaders(),
                                    body: JSON.stringify({ file: `/backups/${file.path}` }),
                                });
                                if (!result.ok) {
                                    return;
                                }
                                const mes = await result.json();
                                text.innerHTML = messageFormatting(
                                    mes.mes,
                                    mes.name,
                                    mes.is_system,
                                    mes.is_user,
                                    null,
                                );
                            });
                            body.append(text);
                        }
                        item.append(body);
                    }
                    list.append(item);
                }
            }
            renderPagination();
        };
        const renderPagination = () => {
            const makePagination = ()=>{
                const frag = document.createDocumentFragment();
                const prev = document.createElement('div'); {
                    prev.classList.add('stbb--pg-prev');
                    prev.classList.add('menu_button');
                    if (page == 0) prev.classList.add('stbb--disabled');
                    prev.textContent = '«';
                    prev.title = 'Previous page';
                    prev.addEventListener('click', ()=>{
                        if (page == 0) return;
                        page--;
                        renderList();
                    });
                    frag.append(prev);
                }
                for (let i = 0; i < Math.ceil(data.length / pageSize); i++) {
                    const num = document.createElement('div'); {
                        num.classList.add('stbb--pg-num');
                        num.classList.add('menu_button');
                        if (i == page) num.classList.add('stbb--pg-current');
                        num.textContent = `${i + 1}`;
                        num.title = `Page ${i + 1}`;
                        num.addEventListener('click', ()=>{
                            if (i == page) return;
                            page = i;
                            renderList();
                        });
                        frag.append(num);
                    }
                }
                const next = document.createElement('div'); {
                    next.classList.add('stbb--pg-next');
                    next.classList.add('menu_button');
                    if (page + 1 >= Math.ceil(data.length / pageSize)) next.classList.add('stbb--disabled');
                    next.textContent = '»';
                    next.title = 'Next page';
                    next.addEventListener('click', ()=>{
                        if (page + 1 >= Math.ceil(data.length / pageSize)) return;
                        page++;
                        renderList();
                    });
                    frag.append(next);
                }
                return frag;
            };
            for (const pg of pagination) {
                pg.replaceChildren(makePagination());
            }
        };
        const dlg = new Popup(dom, POPUP_TYPE.TEXT, null, { okButton:'Close', wide:true });
        dlg.show();
        const result = await fetch('/api/plugins/files/list', {
            method: 'POST',
            headers: getRequestHeaders(),
            body: JSON.stringify({ folder: '/backups' }),
        });
        if (!result.ok) {
            toastr.error(`${result.status}: ${result.statusText}`, 'Something went wrong.');
            dlg.hide();
            return;
        }
        let fileId;
        let fileTest;
        if (getContext().characterId !== undefined) {
            fileId = characters[getContext().characterId].avatar
                .replace('.png', '')
                .toLowerCase()
                .replace(/[^a-z0-9]/gi, '_')
            ;
            fileTest = (file)=>file.path.startsWith(`chat_${fileId}_`);
        } else {
            const chats = await getGroupPastChats(selected_group);
            fileTest = (file)=>{
                return chats.find(c=>file.path.startsWith(`chat_${c.file_name.toLowerCase().replace(/[^a-z0-9]/gi, '_')}_`)) != null;
            };
        }
        /**@type {{
            parent: string;
            path: string;
            type: string;
            modified: number;
            size: number;
        }[]} */
        const data = (await result.json()).filter(fileTest);
        console.log('[BACKUPS]', fileId, data);
        renderList();
    },
    helpString: 'Browse chat backups.',
}));
