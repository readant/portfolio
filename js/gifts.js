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

// 获取礼物数据（优化版，支持大量数据）
function getGifts() {
    try {
        const totalBatches = parseInt(localStorage.getItem('giftTotalBatches') || '1');
        const allGifts = [];
        
        // 分批获取礼物数据
        for (let i = 0; i < totalBatches; i++) {
            const encryptedBatch = localStorage.getItem(`encryptedGifts_${i}`) || localStorage.getItem('encryptedGifts');
            if (encryptedBatch) {
                const batchGifts = decryptData(encryptedBatch);
                if (Array.isArray(batchGifts)) {
                    allGifts.push(...batchGifts);
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
        const gifts = getGifts();
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
        const gifts = getGifts();
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
        const gifts = getGifts();
        const filteredGifts = gifts.filter(gift => gift.id !== id);
        return saveGifts(filteredGifts);
    } catch (error) {
        console.error('删除礼物失败:', error);
        return false;
    }
}

// 搜索礼物
function searchGifts(keyword) {
    try {
        const gifts = getGifts();
        if (!keyword) return gifts;
        
        const searchTerm = keyword.toLowerCase();
        // 加密搜索关键词，用于匹配加密存储的用户名
        const encryptedKeyword = btoa(unescape(encodeURIComponent(keyword)));
        
        return gifts.filter(gift => {
            try {
                // 尝试解密用户名进行匹配
                const decryptedName = decodeURIComponent(escape(atob(gift.name)));
                return (
                    decryptedName.toLowerCase().includes(searchTerm) ||
                    gift.name === encryptedKeyword || // 直接匹配加密后的用户名
                    gift.gift.toLowerCase().includes(searchTerm) ||
                    (gift.note && gift.note.toLowerCase().includes(searchTerm))
                );
            } catch (e) {
                // 如果解密失败，使用原始值进行匹配
                return (
                    gift.name.toLowerCase().includes(searchTerm) ||
                    gift.gift.toLowerCase().includes(searchTerm) ||
                    (gift.note && gift.note.toLowerCase().includes(searchTerm))
                );
            }
        });
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
