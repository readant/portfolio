// 礼物数据管理和加密功能

// 加密函数
function encryptData(data) {
    try {
        const jsonString = JSON.stringify(data);
        return btoa(unescape(encodeURIComponent(jsonString)));
    } catch (error) {
        console.error('加密数据失败:', error);
        return null;
    }
}

// 解密函数
function decryptData(encryptedData) {
    try {
        const jsonString = decodeURIComponent(escape(atob(encryptedData)));
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('解密数据失败:', error);
        return null;
    }
}

// 存储礼物数据（优化版，支持大量数据）
function saveGifts(gifts) {
    try {
        // 分批处理大量数据，避免localStorage容量限制
        const batchSize = 50; // 每批存储50个礼物
        const totalBatches = Math.ceil(gifts.length / batchSize);
        
        // 存储总批数
        localStorage.setItem('giftTotalBatches', totalBatches.toString());
        
        // 分批存储礼物数据
        for (let i = 0; i < totalBatches; i++) {
            const startIndex = i * batchSize;
            const endIndex = startIndex + batchSize;
            const batchGifts = gifts.slice(startIndex, endIndex);
            const encryptedBatch = encryptData(batchGifts);
            
            if (encryptedBatch) {
                localStorage.setItem(`encryptedGifts_${i}`, encryptedBatch);
            } else {
                return false;
            }
        }
        
        return true;
    } catch (error) {
        console.error('存储礼物数据失败:', error);
        return false;
    }
}

// 从远程 JSON 文件加载礼物数据
async function loadGiftsFromJSON() {
    try {
        console.log('开始从 JSON 文件加载礼物数据...');
        // 尝试从不同路径加载礼物数据
        const paths = ['data/gifts.json', '../data/gifts.json', '../../data/gifts.json'];
        
        for (const path of paths) {
            try {
                console.log(`尝试从路径加载: ${path}`);
                const response = await fetch(path);
                if (response.ok) {
                    console.log(`从路径 ${path} 加载成功！`);
                    const data = await response.json();
                    console.log(`礼物数据:`, data);
                    return data.gifts || [];
                } else {
                    console.log(`从路径 ${path} 加载失败: ${response.status}`);
                }
            } catch (e) {
                console.log(`从路径 ${path} 加载出错: ${e.message}`);
                // 忽略单个路径的错误，继续尝试下一个路径
            }
        }
        
        // 所有路径都失败
        throw new Error('Failed to load gifts data from all paths');
    } catch (error) {
        console.error('从 JSON 文件加载礼物数据失败:', error);
        return [];
    }
}

// 获取礼物数据（优化版，支持大量数据）
async function getGifts() {
    try {
        console.log('开始获取礼物数据...');
        // 尝试从远程 JSON 文件加载礼物数据
        const remoteGifts = await loadGiftsFromJSON();
        
        console.log(`远程 JSON 文件加载的礼物数量: ${remoteGifts.length}`);
        
        if (remoteGifts.length > 0) {
            // 如果远程数据加载成功，保存到本地存储
            console.log('保存远程数据到本地存储...');
            saveGifts(remoteGifts);
            console.log('返回远程礼物数据');
            return remoteGifts;
        }
        
        // 如果远程数据加载失败，尝试从本地存储加载
        console.log('远程数据加载失败，尝试从本地存储加载...');
        const totalBatches = parseInt(localStorage.getItem('giftTotalBatches') || '1');
        console.log(`本地存储总批数: ${totalBatches}`);
        const allGifts = [];
        
        // 分批获取礼物数据
        for (let i = 0; i < totalBatches; i++) {
            const encryptedBatch = localStorage.getItem(`encryptedGifts_${i}`) || localStorage.getItem('encryptedGifts');
            if (encryptedBatch) {
                console.log(`从本地存储加载批数 ${i}`);
                const batchGifts = decryptData(encryptedBatch);
                if (Array.isArray(batchGifts)) {
                    console.log(`批数 ${i} 的礼物数量: ${batchGifts.length}`);
                    allGifts.push(...batchGifts);
                }
            }
        }
        
        console.log(`从本地存储加载的礼物总数: ${allGifts.length}`);
        return allGifts;
    } catch (error) {
        console.error('获取礼物数据失败:', error);
        return [];
    }
}

// 同步版本的 getGifts 函数（用于搜索功能）
function getGiftsSync() {
    try {
        console.log('开始同步获取礼物数据...');
        // 尝试从本地存储加载
        const totalBatches = parseInt(localStorage.getItem('giftTotalBatches') || '1');
        console.log(`同步加载 - 本地存储总批数: ${totalBatches}`);
        const allGifts = [];
        
        // 分批获取礼物数据
        for (let i = 0; i < totalBatches; i++) {
            const encryptedBatch = localStorage.getItem(`encryptedGifts_${i}`) || localStorage.getItem('encryptedGifts');
            if (encryptedBatch) {
                console.log(`同步加载 - 从本地存储加载批数 ${i}`);
                const batchGifts = decryptData(encryptedBatch);
                if (Array.isArray(batchGifts)) {
                    console.log(`同步加载 - 批数 ${i} 的礼物数量: ${batchGifts.length}`);
                    allGifts.push(...batchGifts);
                }
            }
        }
        
        console.log(`同步加载 - 从本地存储加载的礼物总数: ${allGifts.length}`);
        
        // 如果本地存储没有数据，尝试从 JSON 文件加载（同步方式）
        if (allGifts.length === 0) {
            console.log('同步加载 - 本地存储没有数据，尝试从 JSON 文件加载...');
            // 注意：这里使用同步 XMLHttpRequest，因为 getGiftsSync 是同步函数
            
            // 尝试从不同路径加载 JSON 文件
            const paths = ['data/gifts.json', '../data/gifts.json', '../../data/gifts.json'];
            
            for (const path of paths) {
                try {
                    console.log(`同步加载 - 尝试从路径加载: ${path}`);
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', path, false);
                    xhr.send();
                    
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        const jsonGifts = data.gifts || [];
                        console.log(`同步加载 - 从 JSON 文件加载的礼物数量: ${jsonGifts.length}`);
                        
                        // 保存到本地存储
                        if (jsonGifts.length > 0) {
                            console.log('同步加载 - 保存 JSON 数据到本地存储...');
                            saveGifts(jsonGifts);
                        }
                        
                        return jsonGifts;
                    } else {
                        console.log(`同步加载 - 从路径 ${path} 加载失败: ${xhr.status}`);
                    }
                } catch (e) {
                    console.log(`同步加载 - 从路径 ${path} 加载出错: ${e.message}`);
                }
            }
        }
        
        return allGifts;
    } catch (error) {
        console.error('获取礼物数据失败:', error);
        return [];
    }
}

// 添加礼物
function addGift(gift) {
    try {
        const gifts = getGiftsSync();
        // 加密用户名
        const encryptedName = btoa(unescape(encodeURIComponent(gift.name)));
        const newGift = {
            id: Date.now(),
            ...gift,
            name: encryptedName // 存储加密后的用户名
        };
        gifts.push(newGift);
        return saveGifts(gifts);
    } catch (error) {
        console.error('添加礼物失败:', error);
        return false;
    }
}

// 更新礼物
function updateGift(id, updatedGift) {
    try {
        const gifts = getGiftsSync();
        const index = gifts.findIndex(gift => gift.id === id);
        if (index !== -1) {
            // 如果更新了名字，需要加密
            if (updatedGift.name) {
                const encryptedName = btoa(unescape(encodeURIComponent(updatedGift.name)));
                updatedGift.name = encryptedName;
            }
            
            gifts[index] = {
                ...gifts[index],
                ...updatedGift
            };
            return saveGifts(gifts);
        }
        return false;
    } catch (error) {
        console.error('更新礼物失败:', error);
        return false;
    }
}

// 删除礼物
function deleteGift(id) {
    try {
        const gifts = getGiftsSync();
        const filteredGifts = gifts.filter(gift => gift.id !== id);
        return saveGifts(filteredGifts);
    } catch (error) {
        console.error('删除礼物失败:', error);
        return false;
    }
}

// 直接从 JSON 文件加载礼物数据（同步方式）
function loadGiftsFromJSONSync() {
    try {
        // 尝试从不同路径加载 JSON 文件 - 确保覆盖所有可能的相对路径
        const paths = [
            'data/gifts.json',      // 从根目录加载
            '../data/gifts.json',   // 从 pages/ 目录加载
            '../../data/gifts.json', // 从 deep nested 目录加载
            '/data/gifts.json',     // 绝对路径加载（从根目录开始）
            'http://localhost:8000/data/gifts.json' // 完整URL加载
        ];
        
        for (const path of paths) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', path, false);
                xhr.send();
                
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    return data.gifts || [];
                }
            } catch (e) {
                // 忽略单个路径的错误，继续尝试下一个路径
            }
        }
        
        // 如果所有路径都失败，返回硬编码的礼物数据作为 fallback
        return [
            {
                "id": 1,
                "name": "6YOt5oCd5rqQ",
                "gift": "生日礼物",
                "note": "第一个生日礼物",
                "date": "2025-10-13",
                "type": "公历",
                "files": [
                    "assets/gifts/guosiyuan/文字云2.0.html",
                    "assets/gifts/guosiyuan/文字云浮现0.3.html",
                    "assets/gifts/guosiyuan/Sacred Play Secret Place(剪辑).mp3",
                    "assets/gifts/guosiyuan/The Way I Still Love You(剪辑).mp3",
                    "assets/gifts/guosiyuan/生日快乐.png"
                ]
            }
        ];
    } catch (error) {
        console.error('从 JSON 文件加载礼物数据失败:', error);
        // 错误时返回硬编码的礼物数据
        return [
            {
                "id": 1,
                "name": "6YOt5oCd5rqQ",
                "gift": "生日礼物",
                "note": "第一个生日礼物",
                "date": "2025-10-13",
                "type": "公历",
                "files": [
                    "assets/gifts/guosiyuan/文字云2.0.html",
                    "assets/gifts/guosiyuan/文字云浮现0.3.html",
                    "assets/gifts/guosiyuan/Sacred Play Secret Place(剪辑).mp3",
                    "assets/gifts/guosiyuan/The Way I Still Love You(剪辑).mp3",
                    "assets/gifts/guosiyuan/生日快乐.png"
                ]
            }
        ];
    }
}

// 搜索礼物
function searchGifts(keyword) {
    try {
        // 先尝试从本地存储加载数据
        let gifts = [];
        try {
            const totalBatches = parseInt(localStorage.getItem('giftTotalBatches') || '1');
            for (let i = 0; i < totalBatches; i++) {
                const encryptedBatch = localStorage.getItem(`encryptedGifts_${i}`) || localStorage.getItem('encryptedGifts');
                if (encryptedBatch) {
                    const batchGifts = decryptData(encryptedBatch);
                    if (Array.isArray(batchGifts)) {
                        gifts.push(...batchGifts);
                    }
                }
            }
        } catch (e) {
            console.error('从本地存储加载礼物数据失败:', e);
        }
        
        // 如果本地存储没有数据，从 JSON 文件加载
        if (gifts.length === 0) {
            gifts = loadGiftsFromJSONSync();
        }
        
        if (!keyword) {
            return gifts;
        }
        
        const searchTerm = keyword.toLowerCase();
        
        // 加密搜索关键词，用于匹配加密存储的用户名
        let encryptedKeyword = '';
        try {
            encryptedKeyword = btoa(unescape(encodeURIComponent(keyword)));
        } catch (e) {
            // 忽略加密错误，继续使用其他匹配方式
        }
        
        const filteredGifts = gifts.filter(gift => {
            // 尝试多种匹配方式
            try {
                // 尝试解密用户名进行匹配
                const decryptedName = decodeURIComponent(escape(atob(gift.name)));
                
                // 确保解密后的名字是字符串
                if (typeof decryptedName === 'string') {
                    const nameMatch = decryptedName.toLowerCase().includes(searchTerm);
                    const encryptedMatch = gift.name === encryptedKeyword;
                    const giftMatch = gift.gift.toLowerCase().includes(searchTerm);
                    const noteMatch = gift.note && gift.note.toLowerCase().includes(searchTerm);
                    
                    return nameMatch || encryptedMatch || giftMatch || noteMatch;
                } else {
                    return false;
                }
            } catch (e) {
                // 如果解密失败，使用原始值进行匹配
                const nameMatch = gift.name.toLowerCase().includes(searchTerm);
                const giftMatch = gift.gift.toLowerCase().includes(searchTerm);
                const noteMatch = gift.note && gift.note.toLowerCase().includes(searchTerm);
                
                return nameMatch || giftMatch || noteMatch;
            }
        });
        
        return filteredGifts;
    } catch (error) {
        console.error('搜索礼物失败:', error);
        return [];
    }
}

// 导出功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveGifts,
        getGifts,
        addGift,
        updateGift,
        deleteGift,
        searchGifts
    };
}
